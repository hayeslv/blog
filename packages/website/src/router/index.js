/*
 * @Author: Lvhz
 * @Date: 2021-09-23 15:30:15
 * @Description: Description
 */
import { defineAsyncComponent } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import navConfig from "./nav.config";
// import articleConfig from "./nav.config.json";

const load = (path) =>
  defineAsyncComponent(() => import(`../pages/${path}.vue`));

// const loadDocs = (path) =>
//   defineAsyncComponent(() => import(`../docs${path}.md`));

function addRoute(route, page) {
  const component = defineAsyncComponent(() => import(`../pages/markdownComp`));
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

// 注册路由
function registerRoute(routeConfig) {
  const route = [];

  route.push({
    path: `/component`,
    redirect: `/component/quickstart`,
    component: load("component"),
    children: [],
  });

  routeConfig.forEach((nav) => {
    if (nav.href) return;
    if (nav.groups) {
      nav.groups.forEach((group) => {
        group.list.forEach((nav) => {
          addRoute(route[0], nav);
        });
      });
    } else if (nav.children) {
      nav.children.forEach((nav) => {
        addRoute(route[0], nav);
      });
    } else {
      addRoute(route[0], nav);
    }
  });

  return route;
}

// 文章路由
// function retisterArticleRoute(routeConfig) {
//   const route = [];
//   route.push({
//     path: `/article`,
//     redirect: `/article/marked`,
//     component: load("component"),
//     children: [],
//   });
//   routeConfig.forEach((nav) => {
//     if (nav.href) return;
//     if (nav.groups) {
//       nav.groups.forEach((group) => {
//         group.list.forEach((nav) => {
//           addRoute(route[0], nav);
//         });
//       });
//     } else if (nav.children) {
//       nav.children.forEach((nav) => {
//         addRoute(route[0], nav);
//       });
//     } else {
//       addRoute(route[0], nav);
//     }
//   });
//   return route;
// }

let routes = registerRoute(navConfig);
// .concat( retisterArticleRoute(articleConfig) );
console.log(routes);

// 静态路由
const staticRoutes = [
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
console.log(routes);

export default router;

// import { defineAsyncComponent } from "vue";
// import navConfig from "./nav.config";

// const load = (path) =>
//   defineAsyncComponent(() => import(`../pages/${path}.vue`));

// const loadDocs = (path) =>
//   defineAsyncComponent(() => import(`../docs${path}.md`));

// const registerRoute = (navConfig) => {
//   const route = [];

//   route.push({
//     path: `/component`,
//     redirect: `/component/quickstart`,
//     component: load("component"),
//     children: [],
//   });

//   navConfig.forEach((nav) => {
//     if (nav.href) return;
//     if (nav.groups) {
//       nav.groups.forEach((group) => {
//         group.list.forEach((nav) => {
//           addRoute(nav);
//         });
//       });
//     } else if (nav.children) {
//       nav.children.forEach((nav) => {
//         addRoute(nav);
//       });
//     } else {
//       addRoute(nav);
//     }
//   });

//   function addRoute(page) {
//     const component =
//       page.path === "/changelog" ? load("changelog") : loadDocs(page.path);
//     const child = {
//       path: page.path.slice(1),
//       meta: {
//         title: page.title || page.name,
//         description: page.description,
//       },
//       name: "component" + (page.title || page.name),
//       component: component.default || component,
//     };

//     route[0].children.push(child);
//   }

//   return route;
// };

// let route = registerRoute(navConfig);

// const generateRoutes = function () {
//   const resourceRoute = {
//     path: `/resource`, // 资源
//     name: "resource",
//     component: load("resource"),
//   };

//   const indexRoute = {
//     path: `/`, // 首页
//     name: "home",
//     component: load("index"),
//   };

//   return [resourceRoute, indexRoute];
// };

// route = route.concat(generateRoutes());

// export default route;
