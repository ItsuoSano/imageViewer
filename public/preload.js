const contextBridge = require('electron').contextBridge

const fs = require('fs')

const jimp = require('jimp')

contextBridge.exposeInMainWorld('core', {
  writeFile (path, data) {
    console.log(fs, jimp)
  }
})
