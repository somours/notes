import {RouteRecordRaw, createRouter, createWebHistory} from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/recommend'
  },
  {
    path: '/recommend',
    name: 'Recommend',
    component: () => import("../views/Recommend.vue")
  },
  {
    path: '/rank',
    name: 'Rank',
    component: () => import("../views/Rank.vue")
  }
]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
export default router
