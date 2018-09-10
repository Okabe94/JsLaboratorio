import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'
import Lend from '@/components/Lend'
import Logout from '@/components/Logout'
import Schedule from '@/components/Schedule'
import Returns from '@/components/Returns'

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
      path: '/returns',
      name: 'returns',
      component: Returns
    },
    {
      path: '/shcedule',
      name: 'schedule',
      component: Schedule
    },
    {
      path: '/logout',
      name: 'logout',
      component: Logout
    }
  ]
})
