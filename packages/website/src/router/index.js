/*
 * @Author: Lvhz
 * @Date: 2021-09-23 15:30:15
 * @Description: Description
 */
import { defineAsyncComponent } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import { CommonApi } from "@api";
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
      url: page.url,
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
    name: "组件",
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
    name: '文章',
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
    name: '算法',
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
  {
    path: "/test", // 测试
    name: "Test",
    component: () => import("@/pages/test"),
  },
];

routes = staticRoutes.concat(routes);

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// 路由守卫
router.beforeResolve(async (to, from, next) => {
  // 如果没有路由，则添加路由；有路由则直接跳转
  if(!hasRoute(to)) {
    await addRoute();
    next(to.fullPath);
  } else {
    next();
  }
})

// 判断当前路由是否存在
function hasRoute(to) {
  return !!router.getRoutes().find(item => item.name === to.name)
}

// 添加路由
async function addRoute() {
  const articleTypeRes = await CommonApi.getArticleRoutes()
  const articleRoutes = articleTypeRes.data || []

  articleRoutes.forEach(parent => {
    // 没有分组，且没有子项：直接跳过当前---类continue
    if(!parent.group && (!parent.children || parent.children.length === 0)) return;
    if(parent.children) {
      const route = {
        path: '/' + parent.type,
        name: parent.name,
        component: load("component"),
        redirect: `/${parent.type}/${parent.children[0].nav}`,
        children: []
      }
      parent.children.forEach(child => {
        route.children.push({
          path: child.nav,
          name: child.title,
          component: () => import('@/pages/markdownTemp.vue'),
          meta: {
            url: child.url
          }
        })
      })

      router.addRoute(route)
    }
  })
}

addRoute()


export default router;
