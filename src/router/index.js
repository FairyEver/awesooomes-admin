import Vue from 'vue'
import Router from 'vue-router'
import _path from 'path'
import _replace from 'lodash.replace'

Vue.use(Router)

const req2router = (publicPath, req) => req.keys().map(req).map(page => {
  const path = _replace(_path.dirname(page.default.__file), publicPath, '')
  return {
    path: `${path}${page.router.pathSuffix || ''}`,
    name: path.split('/').join('-'),
    ...page.router,
    component: page.default
  }
})

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: resolve => { require([`@/page/mainLayout`], resolve) },
      children: req2router('src/page/inLayout/', require.context('@/page/inLayout', true, /page\.vue$/))
    },
    ...req2router('src/page/outLayout', require.context('@/page/outLayout', true, /page\.vue$/))
  ]
})
