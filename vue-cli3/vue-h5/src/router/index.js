import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [{
    path: '/',
    name: 'layout',
    component: () => import('@/views/home/'),
  },
  {
    path: '/502',
    name: '502',
    component: ({
      template: '<h1>权限错误</h1>'
    })
  }
  ]
});
