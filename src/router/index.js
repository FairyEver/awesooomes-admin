import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const req = require.context('@/page/menuHide', false, /\.vue$/)
const pages = req.keys().map(req).map(page => ({
  ...page.router,
  component: page.default
}))

console.log(pages)

export default new Router({
  routes: pages
})
