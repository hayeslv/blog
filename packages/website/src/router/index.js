/*
 * @Author: Lvhz
 * @Date: 2021-09-23 15:30:15
 * @Description: Description
 */
import { defineAsyncComponent } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

const load = (path) =>
  defineAsyncComponent(() => import(`../pages/${path}.vue`));

// 注册路由
function registerRoute() {
  return [];
}

let routes = registerRoute();

// 静态路由
const staticRoutes = [
  {
    path: "/home",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/About.vue"),
  },
  {
    path: "/", // 首页
    name: "home",
    component: load("index"),
  },
];

routes = routes.concat(staticRoutes);

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
