import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/components/layout/index'

Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/',
  //   name: 'Home',
  //   redirect: '/login'
  // },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
