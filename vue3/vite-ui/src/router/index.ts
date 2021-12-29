import {createRouter, createWebHistory} from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/views/home/index.vue'),
    meta: {
      title: '首页'
    }
  },
  {
    path: '/table',
    component: () => import("@/views/table/index.vue"),
    meta: {
      title: '表格示例'
    }
  },
  {
    path: '/code',
    component: () => import('@/views/code/index.vue'),
    meta: {
      title: '验证码示例'
    }
  },
  {
    path: '/dialog',
    component: () => import('@/views/dialog/index.vue'),
    meta: {
      title: '弹窗示例'
    }
  }
]
export const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
