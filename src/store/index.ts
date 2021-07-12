// import Jimp from 'jimp'
import Vue from 'vue'
import Vuex from 'vuex'
import * as fs from 'fs'

Vue.use(Vuex)

export const ACTION_PHOTO_LIST = 'actionPhotoList'
export const GET_PHOTO_LIST = 'getPhotoList'
export const SELECTED_PHOTO = 'selectedPhoto'

export type PhotoList = {
  dataUrl?: string,
  fileData:File
}

export default new Vuex.Store({
  state: {
    photoList: [] as PhotoList[],
    selectedPhoto: null as PhotoList | null
  },
  getters: {
    [GET_PHOTO_LIST] (state) {
      return state.photoList
    },
    [SELECTED_PHOTO] (state) {
      return state.selectedPhoto
    }
  },
  mutations: {
    setPhotoList (state, files) {
      state.photoList = files
    },
    [SELECTED_PHOTO] (state, selectedPhoto: PhotoList) {
      state.selectedPhoto = selectedPhoto
    }
  },
  actions: {
    async [ACTION_PHOTO_LIST] ({ state, commit }, files: File[]) {
      commit('setPhotoList', files.map(fileData => ({ fileData })))
      commit(SELECTED_PHOTO, null)
      console.log(fs.readFileSync)

      const targetArray = files.reduce((acc, file, index) => {
        const target = acc[0]
        if (target.length <= 3) {
          target.push({ file, index })
        } else {
          acc.unshift([{ file, index }])
        }
        return acc
      }, [[]] as {file:File, index:number}[][])
      console.log(targetArray)

      for (const targetFiles of targetArray.reverse()) {
        const promiseArray = targetFiles.map(({ file, index }) => {
          return new Promise((resolve, reject) => {
            const worker = new Worker('@/worker/CreateThumbnail.worker', { type: 'module' })
            worker.addEventListener('message', e => {
              const dataUrl = e.data.dataUrl
              const photoData = state.photoList[index]
              Vue.set(state.photoList, index, { ...photoData, dataUrl })
              resolve(dataUrl)
            })
            worker.postMessage(file)
          })
        })

        await Promise.all(promiseArray)
      }
      files.forEach((file, index) => {
        /*
        fileReaderAsync(file).then((dataUrl) => {
          if (typeof dataUrl === 'string') {
            const photoData = state.photoList[index]
            Vue.set(state.photoList, index, { ...photoData, dataUrl })
          }
        })
        */
        /*
        const photoData = state.photoList[index]
        const worker = new Worker('@/worker/CreateThumbnail.worker', { type: 'module' })
        worker.addEventListener('message', e => {
          const dataUrl = e.data.dataUrl
          Vue.set(state.photoList, index, { ...photoData, dataUrl })
        })
        worker.postMessage(file)
        */
        // @ts-ignore
        // window.core.writeFile('test')
        /*
        console.log(file)
        if (index === 0) {
          const path = `/Users/itsuo_s/Library/Caches/test-app/${file.name}`

          Jimp.read(file.path).then(data => {
            data.resize(250, Jimp.AUTO)
              .write(path)
          })

        }
        */

        /*
        const worker = new Worker('@/worker/FileRead.worker', { type: 'module' })
        worker.addEventListener('message', e => {
          const dataUrl = e.data.dataUrl
          Vue.set(state.photoList, index, { ...photoData, dataUrl })
        })
        worker.postMessage(file)
        */
      })
    }
  },
  modules: {
  }
})
