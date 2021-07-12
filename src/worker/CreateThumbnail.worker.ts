/* eslint-disable */
import Jimp from "jimp/es"
//import path from "path"

//import mkdirp from "mkdirp"
const ctx = self
// fs は 別プロセスから呼び出す
const fs = ctx.require("fs")
const os = ctx.require("os")
const el = ctx.require("electron")
const path = ctx.require("path")
//let path = path || ctx.require("path")


ctx.addEventListener('message', async e => {
  const file = e.data as File
  //const dir = `${os.tmpdir}/test-app/`
  const savePath = path.join(os.tmpdir(), "image-viewer", file.path.replace(/^([A-Z]):/, "$1"))
  if (fs.existsSync(savePath)) {
    return ctx.postMessage({ dataUrl: savePath })
  }

  if (fs.existsSync(savePath)) {
    ctx.postMessage({ dataUrl: savePath })
  } else {
    const image = await Jimp.read(`file://${file.path}`)
    image.resize(250, Jimp.AUTO)
      .quality(60)
      .getBufferAsync(image.getMIME()).then(data => {
        fs.mkdirSync(path.dirname(savePath), { recursive: true })
        //fs.mkdirSync(dir, { recursive: true })
        fs.writeFileSync(savePath, data)

        ctx.postMessage({ dataUrl: savePath })
      })
  }
})
