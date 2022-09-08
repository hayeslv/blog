import { createSSRApp } from "vue";
import App from "./App.vue";
import { createRouter } from "./router";
import { createPinia } from "pinia";

// antd
import "ant-design-vue/dist/antd.css";
import "./style/common.scss";
import "./style/juejin-markdown-theme/channing-cyan.scss";

export function createApp() {
  const app = createSSRApp(App);
  const router = createRouter();
  const pinia = createPinia();
  app.use(router);
  app.use(pinia);
  return { app, router, pinia };
}
