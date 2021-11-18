/*
 * @Author: Lvhz
 * @Date: 2021-09-23 15:30:15
 * @Description: Description
 */
import { defineAsyncComponent } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import componentConfig from "./component.config";
import articleConfig from "./article.config.json";
import algorithmConfig from "./algorithm.config.json";

const load = (path) =>
  defineAsyncComponent(() => import(`../pages/${path}.vue`));

// const loadDocs = (path) =>
//   defineAsyncComponent(() => import(`../docs${path}.md`));

// 添加md路由
function addDocRoute(route, page) {
  const component = defineAsyncComponent(() => import(`../pages/markdownTemp`));
  const child = {
    path: page.path.slice(1),
    meta: {
      title: page.title || page.name,
      description: page.description,
      filePath: page.filePath || "docs",
    },
    name: "component" + (page.title || page.name),
    component: component.default || component,
  };

  route.children.push(child);
}
// 添加组件路由
function addComponentRoute(route, page) {
  const component = defineAsyncComponent(() =>
    import(`../pages/componentTemp`)
  );
  const child = {
    path: page.path.slice(1),
    meta: {
      title: page.title || page.name,
      description: page.description,
      filePath: page.filePath || "docs",
    },
    name: "component" + (page.title || page.name),
    component: component.default || component,
  };

  route.children.push(child);
}

// 注册组件路由
function registerCompoentRoute(routeConfig) {
  const route = [];

  route.push({
    path: `/component`,
    redirect: `/component/column`,
    component: load("component"),
    children: [],
  });

  routeConfig.forEach((nav) => {
    if (nav.href) return;
    if (nav.groups) {
      nav.groups.forEach((group) => {
        group.list.forEach((nav) => {
          addComponentRoute(route[0], nav);
        });
      });
    } else if (nav.children) {
      nav.children.forEach((nav) => {
        addComponentRoute(route[0], nav);
      });
    } else {
      addComponentRoute(route[0], nav);
    }
  });

  return route;
}

// 文章路由
function retisterArticleRoute(routeConfig) {
  const route = [];
  route.push({
    path: `/article`,
    redirect: `/article/plugin-marked`,
    component: load("component"),
    children: [],
  });
  routeConfig.forEach((nav) => {
    if (nav.href) return;
    if (nav.groups) {
      nav.groups.forEach((group) => {
        group.list.forEach((nav) => {
          addDocRoute(route[0], nav);
        });
      });
    } else if (nav.children) {
      nav.children.forEach((nav) => {
        addDocRoute(route[0], nav);
      });
    } else {
      addDocRoute(route[0], nav);
    }
  });
  return route;
}

// 算法路由
function registerAlgorithmRoute(routeConfig) {
  const route = [];
  route.push({
    path: `/algorithm`,
    redirect: `/algorithm/leetcode-53`,
    component: load("component"),
    children: [],
  });
  routeConfig.forEach((nav) => {
    if (nav.href) return;
    if (nav.groups) {
      nav.groups.forEach((group) => {
        group.list.forEach((nav) => {
          addDocRoute(route[0], nav);
        });
      });
    } else if (nav.children) {
      nav.children.forEach((nav) => {
        addDocRoute(route[0], nav);
      });
    } else {
      addDocRoute(route[0], nav);
    }
  });
  return route;
}

let routes = registerCompoentRoute(componentConfig).concat(
  retisterArticleRoute(articleConfig)
).concat(registerAlgorithmRoute(algorithmConfig));

// 静态路由
const staticRoutes = [
  {
    path: "/", // 首页
    name: "home",
    component: () => import("@/pages/index.vue"),
  },
  {
    path: "/contribution", // 贡献
    name: "Contribution",
    component: () => import("@/pages/contribution"),
  },
];

routes = staticRoutes.concat(routes);

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
