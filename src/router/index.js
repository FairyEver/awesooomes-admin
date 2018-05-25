import Vue from 'vue'
import Router from 'vue-router'
import _path from 'path'
import _replace from 'lodash.replace'

Vue.use(Router)

const req2router = (publicPath, req) => {
  return req.keys().map(req).map(page => {
    const path = _replace(_path.dirname(page.default.__file), publicPath, '')
    const name = path.split('/').join('-')
    return {
      path,
      name,
      ...page.router,
      component: page.default
    }
  })
}

const reqMenuHide = require.context('@/page/menuHide', true, /page\.vue$/)
const reqMenuShow = require.context('@/page/menuShow', true, /page\.vue$/)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: resolve => { require([`@/page/mainLayout`], resolve) },
      children: req2router('src/page/menuShow/', reqMenuShow)
    },
    // 注意 'src/page/menuHide' 后面没有 '/'
    ...req2router('src/page/menuHide', reqMenuHide)
  ]
})
