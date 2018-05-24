import Vue from 'vue'
import Router from 'vue-router'
import path from 'path'

Vue.use(Router)

const req = require.context('@/page/menuHide', false, /\.vue$/)
const demos = req.keys().map(req).map(e => {
  const def = e.default
  const name = path.basename(def.__file, '.vue')
  def.routerPath = name
  def.routerName = name
  return def
})

console.log(demos)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: resolve => { require(['@/page/menuHide/login.vue'], resolve) }
    }
  ]
})
