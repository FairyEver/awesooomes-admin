import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const req2router = (req) => {
  return req.keys().map(req).map(page => ({
    ...page.router,
    component: page.default
  }))
}

const reqMenuHide = require.context('@/page/menuHide', false, /\.vue$/)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: resolve => { require([`@/page/mainLayout`], resolve) }
    },
    ...req2router(reqMenuHide)
  ]
})
