const WorkerPlugin = require('worker-plugin')
const webpack = require('webpack')

module.exports = {

  pluginOptions: {
    electronBuilder: {
      // nodeIntegration: true,

      buildOptions: {
        productName: 'image-viewer',
        appId: 'net.actionscript-junky.test-app',
        win: {
          target: [
            {
              target: 'zip',
              arch: ['x64']
            }
          ]
        }
      }
    }
  },
  transpileDependencies: [
    'vuetify'
  ],
  lintOnSave: false,
  configureWebpack: {
    plugins: [
      new WorkerPlugin({
        plugins: [
          new webpack.DefinePlugin({
            // 'process.browser': false
          })
        ]
      }),
      new webpack.DefinePlugin({
        // 'process.browser': 'true'
        // 'process.env.DIRNAME': __dirname
      })
    ]
  }
}
