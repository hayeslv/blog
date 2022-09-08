# Vue3+Vite3 SSR基本搭建

首先说明如果是生成使用强烈推荐 `Nuxt`。

本篇是为了想深入服务端渲染的运行原理，会根据渲染流程搭建一个 `demo` 版的 `ssr`。

主要技术栈：`vue3 + vite3 + pinia + vue-router4 + express`



## SSR渲染流程

- 首先浏览器想服务器请求，然后服务器根据请求的路由，会匹配相关的路由组件，然后执行组件的自定义服务端声明周期（例：`Nuxt` 的 `asyncData`）或者自定义获取数据的 `hook`，并且把执行后的数据收集起来，统一在 `window` 的属性中存储
- 然后 `vue` 的组件会被 `renderToString` 渲染成静态 `HTML` 字符串，替换掉 `index.html` 中提前指定的占位代码。然后 `index.html` 改变后的静态字符串会发送给客户端
- 客户端拿到后，首先对数据进行初始化，然后进行激活，因为当前 `html` 只是静态数据，激活主要做两件事
  - 1、把页面中的 `DOM` 元素与虚拟 `DOM` 之间建立联系
  - 2、为页面中的 `DOM` 元素添加事件绑定



## 1、创建项目

**首先用 `vite` 命令创建项目**：`pnpm create vite vue-ssr --template vue-ts`

**安装相关依赖：**`pnpm add express pinia vue-router@4`

**创建三个文件：** `server.js`、`src/entry-client.ts`、`src/entry-server.js`

- `server.js`：服务端启动文件
- `entry-client.ts`：客户端入口，应用挂载元素
- `entry-server.js`：服务端入口，处理服务端逻辑和静态资源

**修改 `package.json` 运行脚本** 

```json
"scripts": {
  "dev": "node server", // 运行开发环境
}
```

**改为函数方式**

需要把应用创建都改为函数的方式进行调用创建，因为在 `SSR` 环境下，和纯客户端不一样，服务器只会初始化一次，所以为了防止状态污染，每次请求必须是全新的实例。

```js
// src/main.ts
import { createSSRApp } from "vue";
import App from "./App.vue";
import { createRouter } from "./router";
import { createPinia } from "pinia";

export function createApp() {
  const app = createSSRApp(App);
  const router = createRouter();
  const pinia = createPinia();
  app.use(router);
  app.use(pinia);
  return { app, router, pinia };
}
```

**`router` 同理**

```js
// src/router/index.ts
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
```

然后修改 `index.html`，增加注释占位和客户端入口文件，在之后的服务端渲染时注入

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" href="/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>hayesLv</title>
    <!-- 静态资源占位 .js .css ... -->
    <!--preload-links-->
  </head>
  <body>
    <!-- 应用代码占位 -->
    <div id="app"><!--ssr-outlet--></div>
    <script type="module" src="/src/main.ts"></script>
    <!-- 引入客户端入口文件 -->
    <script type="module" src="/src/entry-client.ts" ></script>
    <script>
      // 服务端获取的数据统一挂载到Window上
      window.__INITIAL_STATE__ = '<!--pinia-state-->'
    </script>
  </body>
</html>
```



## 2、服务端启动文件

`pnpm add -S compression@1.7.4 serve-static@1.15.0`

- 创建项目后，就开始编写服务端启动文件，也就是项目根路径下的 `server.js` 文件
- 这个文件的功能是启动一个 `node` 服务，然后根据请求，读取 `html` 文件，处理资源后把注释进行替换，最后把 `html` 发送给客户端

```js
// server.js
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import express from "express";

import { createRequire } from "module";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);
const resolve = (p) => path.resolve(__dirname, p);

const createServer = async(isProd = process.env.NODE_ENV === "production") => {
  const app = express();

  // 配置vite服务
  let vite;
  if (isProd) {
    app.use(require("compression")());
    app.use(
      require("serve-static")(resolve("./dist/client"), {
        index: false,
      }),
    );
  } else {
    vite = await require("vite").createServer({
      server: {
        middlewareMode: true,
      },
      appType: "custom",
    });
    app.use(vite.middlewares);
  }

  // 生产环境下的静态资源映射
  const manifest = isProd ? fs.readFileSync(resolve("./dist/client/ssr-manifest.json"), "utf-8") : {};

  app.use("*", async(req, res, next) => {
    const url = req.originalUrl;
    try {
      // 获取不同环境下的html模版和渲染函数
      let template, render;
      if (isProd) {
        template = fs.readFileSync(resolve("./dist/client/index.html"), "utf-8");
        render = (await import("./dist/server/entry-server.js")).render;
      } else {
        template = fs.readFileSync(
          resolve("index.html"),
          "utf-8",
        );
        template = await vite.transformIndexHtml(url, template);
        render = (await vite.ssrLoadModule("/src/entry-server.js")).render;
      }
      const [appHtml, preloadLinks, piniaState] = await render(url, manifest);

      // 替换处理过后的资源
      const html = template
        .replace("<!--preload-links-->", preloadLinks)
        .replace("<!--ssr-outlet-->", appHtml)
        .replace("<!--pinia-state-->", piniaState);

      res.status(200).set({ "Content-Type": "text/html" }).end(html);
    } catch (error) {
      vite?.ssrFixStacktrace(error);
      next();
    }
  });

  app.listen(5100, () => {
    console.log("http://localhost:5100");
  });
};

createServer();
```



## 3、服务端入口文件

服务端入口文件主要是调用 `SSR` 的 `renderToString` 和收集需要发送的资源及数据

```js
import { renderToString } from 'vue/server-renderer'
import { createApp } from './main'

export async function render(url, manifest) {
  const { app, router, pinia } = createApp()

  router.push(url)
  await router.isReady()

  const ctx = {}
  const html = await renderToString(app, ctx)
  return [html, JSON.stringify(pinia.state.value)]
}

```



## 4、客户端入口文件

客户端入口文件主要用于挂载节点和初始化数据

```js
// entry-client.ts
import { createApp } from "./main";

const { app, router, pinia } = createApp();

router.isReady().then(() => {
  if (window.__INITIAL_STATE__) {
    pinia.state.value = JSON.parse(window.__INITIAL_STATE__);
  }

  app.mount("#app");
});
```



## 5、组件数据

组件和页面获取数据主要有两种方式：

- 一种是增加一个 `asyncData` 选项，然后在 `entry-server.js` 的逻辑中增加遍历当前组件的逻辑，统一触发 `asyncData`，但是现在都是用 `script setup` 的方式写业务代码，所以有点麻烦

```vue
<script>
export default {
  asyncData() {
    // 服务端获取数据逻辑
  }
}
</script>
<script setup lang="ts">
// ...
</script>
```

- 另一种就是 `hook` 的方式，通过 `import.meta.env.SSR` 的方式进行判断

```js
// src/hooks/index.ts
export const useServerData = async (cb: (...args: any) => void) => {
  if(import.meta.env.SSR) {
    cb && cb();
  }
}
```

**store**

```js
// store/count.ts
import { defineStore } from "pinia";
export const useCounterStore = defineStore("counter", {
  state: () => ({
    count: 0
  }),
  actions: {
    increment() {
      this.count++
    }
  }
})
```



页面中：`about.vue`

```vue
<template>
	<div>about</div>
	<div @click="counterStore.increment()">{{ counterStore.count }}</div>
</template>

<script lang="ts" setup>
import { useCounterStore } from "~/store/count";
import { useServerData } from "~/hooks";
  
const counterStore = useCounterStore();
useServerData(() => {
  counterStore.increment();
})
</script>
```



## 6、生产环境

### 6.1 package.json

增加构建脚本

```json
"scripts": {
  "dev": "node server",
+ "build": "npm run build:client && npm run build:server",
+  "build:client": "vite build --ssrManifest --outDir dist/client",
+  "build:server": "vite build --ssr src/entry-server.js --outDir dist/server",
+  "serve": "cross-env NODE_ENV=production node server"
}
```



### 6.2 服务端运行文件

针对生成环境，需要启动静态资源服务，引用路径需要改为 `dist` 目录下

```js
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import express from 'express'

import { createRequire } from 'module';
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const require = createRequire(import.meta.url);
const resolve = (p) => path.resolve(__dirname, p);

const createServer = async (isProd = process.env.NODE_ENV === 'production') => {
  const app = express()

-  const vite = await require('vite').createServer({
-    server: {
-      middlewareMode: true,
-    },
-    appType: 'custom'
-  });
-  app.use(vite.middlewares);

+  let vite;
+  if (isProd) {
+    app.use(require('compression')());
+    app.use(
+      require('serve-static')(resolve('./dist/client'), {
+        index: false
+      })
+    );
+  } else {
+    vite = await require('vite').createServer({
+      server: {
+        middlewareMode: true,
+      },
+      appType: 'custom'
+    });
+    app.use(vite.middlewares);
+  }
   // 通过bulid --ssrManifest命令生成的静态资源映射需要在生产环境下引用
+  const manifest = isProd ? fs.readFileSync(resolve('./dist/client/ssr-manifest.json'), 'utf-8') :{}
  
  app.use('*', async (req, res, next) => {
    const url = req.originalUrl
    try {
-      let template = fs.readFileSync(
-        resolve('index.html'),
-        'utf-8'
-      )
-      template = await vite.transformIndexHtml(url, template)
-      const render = (await vite.ssrLoadModule('/src/entry-server.js')).render
-      const [ appHtml, piniaState ] = await render(url)

+      let template, render
+      if (isProd) {
+        template = fs.readFileSync(resolve('./dist/client/index.html'), 'utf-8')
+        render = (await import('./dist/server/entry-server.js')).render
+      } else {
+        template = fs.readFileSync(
+          resolve('index.html'),
+          'utf-8'
+        )
+        template = await vite.transformIndexHtml(url, template)
+        render = (await vite.ssrLoadModule('/src/entry-server.js')).render
+      }
+      const [ appHtml, preloadLinks, piniaState ] = await render(url, manifest)
      const html = template
+       .replace(`<!--preload-links-->`, preloadLinks)
        .replace(`<!--ssr-outlet-->`, appHtml)
        .replace(`<!--pinia-state-->`, piniaState)
      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (error) {
      vite?.ssrFixStacktrace(error)
      next()
    }
  })

  app.listen(5100)
}

createServer();
```



### 6.3 服务端入口文件

服务端入口文件主要是增加了构建时生成的静态资源映射处理的逻辑

```js
import { basename } from 'path'
import { renderToString } from 'vue/server-renderer'
import { createApp } from './main'

export async function render(url, manifest) {
  const { app, router, pinia } = createApp()

  router.push(url)
  await router.isReady()

  const ctx = {}
  const html = await renderToString(app, ctx)
+  const preloadLinks = renderPreloadLinks(ctx.modules, manifest)
+  return [html, preloadLinks, JSON.stringify(pinia.state.value)]
}

+ function renderPreloadLinks(modules, manifest) {
+   let links = ''
+   const seen = new Set()
+   modules.forEach((id) => {
+     const files = manifest[id]
+     if (files) {
+       files.forEach((file) => {
+         if (!seen.has(file)) {
+           seen.add(file)
+           const filename = basename(file)
+           if (manifest[filename]) {
+             for (const depFile of manifest[filename]) {
+               links += renderPreloadLink(depFile)
+               seen.add(depFile)
+             }
+           }
+           links += renderPreloadLink(file)
+         }
+       })
+     }
+   })
+   return links
+ }
+ 
+ function renderPreloadLink(file) {
+   if (file.endsWith('.js')) {
+     return `<link rel="modulepreload" crossorigin href="${file}">`
+   } else if (file.endsWith('.css')) {
+     return `<link rel="stylesheet" href="${file}">`
+   } else if (file.endsWith('.woff')) {
+     return ` <link rel="preload" href="${file}" as="font" type="font/woff" crossorigin>`
+   } else if (file.endsWith('.woff2')) {
+     return ` <link rel="preload" href="${file}" as="font" type="font/woff2" crossorigin>`
+   } else if (file.endsWith('.gif')) {
+     return ` <link rel="preload" href="${file}" as="image" type="image/gif">`
+   } else if (file.endsWith('.jpg') || file.endsWith('.jpeg')) {
+     return ` <link rel="preload" href="${file}" as="image" type="image/jpeg">`
+   } else if (file.endsWith('.png')) {
+     return ` <link rel="preload" href="${file}" as="image" type="image/png">`
+   } else {
+     return ''
+   }
+ }

```



## 总结

[代码地址](https://github.com/hayeslv/project-practice/tree/master/vue3%2Bvite%2Bssr)



































