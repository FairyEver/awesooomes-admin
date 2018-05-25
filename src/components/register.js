import Vue from 'vue'

// 页面标题
Vue.component('pageTitle', resolve => { require(['@/components/pageTitle'], resolve) })

// 分页
Vue.component('page', resolve => { require(['@/components/page'], resolve) })
