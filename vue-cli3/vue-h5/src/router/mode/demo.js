export default {
  path: '/demo',
  name: 'demo',
  component: () => import('@/views/demo/index'),
  children: [
    {
      path: 'triangle',
      name: 'triangle',
      component: () => import('@/views/demo/triangle/index')
    }
  ]
}