/*
 * @Author: Lvhz
 * @Date: 2021-08-17 10:32:13
 * @Description: Description
 */
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import './icons'
import './permission' // 权限控制
import '@/style/index.scss' // global css

import ElementUI from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'

import GlobalComp from './plugins/globalComp';

createApp(App)
  .use(store)
  .use(router)
  .use(ElementUI)
  .use(GlobalComp)
  .mount('#app');
