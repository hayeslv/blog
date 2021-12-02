/*
 * @Author: Lvhz
 * @Date: 2021-09-23 15:30:15
 * @Description: Description
 */
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import ElementUI from "element3";

// antd
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";

import "./assets/styles/common.scss";
import "./assets/styles/juejin-markdown-theme/channing-cyan.scss"; // 掘金md样式
import GlobalComp from "./plugins/globalComp";

const app = createApp(App);

app.use(router);
app.use(ElementUI);
app.use(GlobalComp);
app.use(Antd);


// app.component("el-progresss", ElProgress);

router.isReady().then(() => {
  app.mount("#app");
});
