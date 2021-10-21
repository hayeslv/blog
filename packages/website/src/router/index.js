/*
 * @Author: Lvhz
 * @Date: 2021-09-23 15:30:15
 * @Description: Description
 */
// import { defineComponent } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

// const btnConfig = {
//   path: "/button",
//   title: "Button 按钮",
// };

// const loadDocs = (path) => defineComponent(() => import(`../docs${path}.md`));

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];
// function addDocRoute(page) {
//   const component = loadDocs(page.path);
//   console.log(page);
//   console.log(component);
//   routes.push({
//     path: page.path.slice(0),
//     meta: {
//       title: page.title || page.name,
//       description: page.description,
//     },
//     name: "component " + (page.title || page.name),
//     component: component.default || component,
//   });
// }
// addDocRoute(btnConfig);

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
