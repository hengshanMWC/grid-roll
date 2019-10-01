export default [
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '/index',
    name: '首页',
    component: function (resolve) {
      require(['@/views/index'], resolve)
    }
  }
]
