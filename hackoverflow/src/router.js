import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/signin',
      name: 'signin',
      component: () => import('./views/Form.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Form.vue')
    },
    {
      path: '/question',
      name: 'question',
      component: () => import('./views/Form.vue')
    },
    {
      path:'/profile/:id',
      name: 'profile',
      component: () => import('./views/profile.vue')
    },
    {
      path: '/question/:id',
      name: 'questionDetail',
      component: () => import('./views/Detail.vue')
    }
  ]
})
