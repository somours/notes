import { createApp } from 'vue';
import router from './router/index';
import store from './store/index';
import App from './App.vue';
import globalComponent from "@/assets/js/components";
import lazyPlugin from "vue3-lazy";
import "@/assets/styles/reset.styl"

createApp(App)
  .use(router)
  .use(store)
  .use(globalComponent)
  .use(lazyPlugin, {
    loading: require('@/assets/images/loading.png'),
    error: require('@/assets/images/error.png')
  })
  .mount('#app');
