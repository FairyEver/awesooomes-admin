import Vue from 'vue'
import Router from 'vue-router'
import login from '@/page/login/index.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: login
    }
  ]
})
