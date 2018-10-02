import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'
import Lend from '@/components/Create/Lend'
import Stock from '@/components/Stock/MainViewStock'
import Schedule from '@/components/Schedule'
import Register from '@/components/Register/MainViewRegister'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/lend',
      name: 'lend',
      component: Lend
    },
    {
      path: '/stock',
      name: 'stock',
      component: Stock
    },
    {
      path: '/schedule',
      name: 'schedule',
      component: Schedule
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    }
  ]
})
