/*
 * @Author: Lvhz
 * @Date: 2021-04-13 15:14:37
 * @Description: Description
 */
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import GlobalComp from './plugins/globalComp';
// import ScreenFlexible from './plugins/screenFlexible';
// Vue.use(ScreenFlexible);

Vue.use(GlobalComp);

Vue.prototype.$bus = new Vue();

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
