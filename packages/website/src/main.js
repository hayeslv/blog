/*
 * @Author: Lvhz
 * @Date: 2021-09-23 15:30:15
 * @Description: Description
 */
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import "./assets/styles/common.scss";

createApp(App).use(router).mount("#app");
