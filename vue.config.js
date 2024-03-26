const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/api': {
        target: 'https://183.232.249.91:11514/',
        ws: true,
        changeOrigin: true,// 设置成true：发送请求头中host会设置成target
        pathRewrite:{
          '^/api': '/'
        }
      }
    }
  }
})
