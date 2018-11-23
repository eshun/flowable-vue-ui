module.exports = {
  proxy: {
    '/flowable-modeler': {
      target: 'http://localhost:8080/',  // 接口域名
      changeOrigin: true,  //是否跨域
      // pathRewrite: (path) => {
      //   return "/flowable-modeler"
      // }
    },
    '/flowable-admin': {
      target: 'http://localhost:8080/',  // 接口域名
      changeOrigin: true,  //是否跨域
      // pathRewrite: (path) => {
      //   return "/flowable-modeler"
      // }
    },
    '/flowable-idm': {
      target: 'http://localhost:8080/',  // 接口域名
      changeOrigin: true,  //是否跨域
      // pathRewrite: (path) => {
      //   return "/flowable-modeler"
      // }
    },
    '/flowable-task': {
      target: 'http://localhost:8080/',  // 接口域名
      changeOrigin: true,  //是否跨域
      // pathRewrite: (path) => {
      //   return "/flowable-modeler"
      // }
    },
  }
}
