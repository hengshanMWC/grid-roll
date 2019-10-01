import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'

Vue.use(Router)

export function createRouter () {
  let router = new Router({
    routes
  })

  router.afterEach(async (to, from) => {
    if (to.meta.needScrollTop) {
      setTimeout(() => {
        window.scrollTo(0, 0)
      }, 300)
    }
  })

  return router
}
