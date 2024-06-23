const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      // '/api': {
      //   target: 'https://124.71.22.245:10010/',
      //   ws: true,
      //   changeOrigin: true,// 设置成true：发送请求头中host会设置成target
      //   pathRewrite:{
      //     '^/api': '/'
      //   },
      '/api': {
        target: 'https://jsonplaceholder.typicode.com',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    },
    historyApiFallback: true,
    allowedHosts: "all",
  }
})
