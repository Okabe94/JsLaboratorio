import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'
import Stock from '@/components/stock/MainViewStock'
import Schedule from '@/components/Schedule'
import Register from '@/components/register/MainViewRegister'
import Request from '@/components/create/Request'
import AddItem from '@/components/create/AddItem'
import DeleteMonitor from '@/components/admin/DeleteMonitor'

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
    },
    {
      path: '/request',
      name: 'request',
      component: Request
    },
    {
      path: '/deleteMonitor',
      name: 'deleteMonitor',
      component: DeleteMonitor
    },
    {
      path: '/addItem',
      name: 'addItem',
      component: AddItem
    }
  ]
})
