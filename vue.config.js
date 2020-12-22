module.exports = {
  devServer: {
    port: 9000,
    proxy: {
      '/api': {
        target: 'http://demo.vxdata.cn:9500/prod-api',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        },
        ws: true
      }
    }
  }
};
