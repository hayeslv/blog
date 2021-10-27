/*
 * @Author: Lvhz
 * @Date: 2021-09-23 15:30:15
 * @Description: Description
 */
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import * as Element3 from "element3";

import "./assets/styles/common.scss";

const app = createApp(App);
app.use(router);
app.use(Element3);

router.isReady().then(() => {
  app.mount("#app");
});
