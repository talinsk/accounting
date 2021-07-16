import Vue from 'vue'
import Router from 'vue-router'
import Payments from '../components/Payments'
import About from '../components/About'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/add/payment/:category?',
      name: 'add',
      component: Payments
    },
    {
      path: '/',
      name: 'default',
      component: Payments
    },
    {
      path: '/about',
      name: 'about',
      component: About
    }
  ]
})
