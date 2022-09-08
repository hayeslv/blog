import type { RouteRecordRaw } from "vue-router";
import { createRouter as _createRrouter, createMemoryHistory, createWebHistory } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("~/pages/home.vue"),
  },
  {
    path: "/algorithm",
    component: () => import("~/pages/algorithm/index.vue"),
  },
];

export function createRouter() {
  return _createRrouter({
    history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
    routes,
  });
}
