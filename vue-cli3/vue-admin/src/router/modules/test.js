/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const testsRouter = {
  path: '/test',
  component: Layout,
  redirect: 'noRedirect',
  name: 'Demo1',
  meta: {
    title: 'TestDemo',
    icon: 'chart'
  },
  children: [
    {
      path: 'demo1',
      component: () => import('@/views/test/demo1/index'),
      name: 'TestDemo1',
      meta: { title: 'TestDemo1' }
    },
    {
      path: 'demo2',
      component: () => import('@/views/test/demo2/index'),
      name: 'TestDemo2',
      meta: { title: 'TestDemo2' }
    }
  ]
}

export default testsRouter
