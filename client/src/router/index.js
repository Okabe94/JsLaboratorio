import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'
import Schedule from '@/components/Schedule'
import Request from '@/components/create/Request'
import AddItem from '@/components/create/AddItem'
import Stock from '@/components/stock/MainViewStock'
import Students from '@/components/students/MainViewStudents'
import DeleteMonitor from '@/components/admin/DeleteMonitor'
import Register from '@/components/register/MainViewRegister'
import RequestHistory from '@/components/admin/RequestHistory'

Vue.use(Router)

export default new Router({
  routes: [
    {
      name: 'home',
      path: '/',
      component: Home
    },
    {
      name: 'login',
      path: '/login',
      component: Login
    },
    {
      name: 'stock',
      path: '/stock',
      component: Stock
    },
    {
      name: 'students',
      path: '/students',
      component: Students
    },
    {
      name: 'schedule',
      path: '/schedule',
      component: Schedule
    },
    {
      name: 'register',
      path: '/register',
      component: Register
    },
    {
      name: 'request',
      path: '/request',
      component: Request
    },
    {
      name: 'deleteMonitor',
      path: '/deleteMonitor',
      component: DeleteMonitor
    },
    {
      name: 'history',
      path: '/history',
      component: RequestHistory
    },
    {
      name: 'addItem',
      path: '/addItem',
      component: AddItem
    }
  ]
})
