/*
 * @Author: Lvhz
 * @Date: 2021-09-23 15:30:15
 * @Description: Description
 */
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import ElementUI from "element3";

import "./assets/styles/common.scss";
import "./assets/styles/juejin-markdown-theme/channing-cyan.scss";

const app = createApp(App);
app.use(router);
app.use(ElementUI);

router.isReady().then(() => {
  app.mount("#app");
});
