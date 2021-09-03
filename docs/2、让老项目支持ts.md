## 安装ts

#### 全局安装

```bash
npm install -g typescript
```

#### 项目内安装ts

```bash
npm i typescript ts-loader@8.2.0 -D
```



## ts配置

#### vue.config.js配置

添加extension，引入ts/tsx文件时不必加后缀

```js
// vue.config.js
module.exports = {
  /** 其他与本次改动无关的配置 */
  /**
   * @param {import('webpack-chain')} config
   */
  chainWebpack: (config) => {
    config
      .resolve.extensions.add('.ts').add('.tsx')
      .end().end()
      .module
      .rule('typescript')
      .test(/\.tsx?$/)
      .use('babel-loader')
      .loader('babel-loader')
      .end()
      .use('ts-loader')
      .loader('ts-loader')
      .options({
        transpileOnly: true,
        appendTsSuffixTo: [
          '\\.vue$',
        ],
        happyPackMode: false,
      })
      .end();
  }
}
```

主要的配置就是对于 `.ts`、`.tsx`文件先通过 ts-loader 解析，然后再交由babel处理。



#### 配置tsconfig.json

ts的编译需要读取 tsconfig.json 文件，在根目录下创建 tsconfig.json 文件

```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "esnext",
    "module": "esnext",
    "strict": true,
    "jsx": "preserve",
    "importHelpers": true,
    "moduleResolution": "node",
    "experimentalDecorators": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "sourceMap": true,
    "baseUrl": ".",
    "types": [
      "node"
    ],
    "paths": {
      "@/*": [
        "src/*"
      ]
    },
    "lib": [
      "esnext",
      "dom",
      "dom.iterable",
      "scripthost"
    ]
  },
  "include": [
    "src/**/*.js",
    "src/**/*.ts",
    "src/**/*.tsx",
    "src/**/*.vue",
    "tests/**/*.ts",
    "tests/**/*.tsx"
  ],
  "exclude": [
    "node_modules"
  ],
}
```



进行到这一步，如果你只是想简单的在项目中混用ts的话(比如在.js、.vue中引入.ts)，配置就算是全部完成了，你可以新建一个 `.ts` 文件，然后再入口文件中导入开发测试了；如果你还需要eslint进行代码规范、编写类组件等需求的，则需要继续进行下面的步骤



#### ts-eslint配置

因为eslint的生态圈比较繁荣，typescript团队已经放弃了tslint从而转向eslint，所以这里我们也是用eslint作为代码规范校验的工具。需要安装以下工具

```bash
cnpm i @typescript-eslint/eslint-plugin @typescript-eslint/parser @vue/eslint-config-typescript -D
```

修改eslint配置文件

```js
//.eslintrc.js
module.exports = {
  // 关键配置
   plugins: ['@typescript-eslint'],
   extends: [
    'plugin:vue/essential',
    '@vue/typescript',
  ],
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
}
```

#### 在ts文件中导入.vue文件

默认情况下，typescript是无法识别 .vue 文件，当你需要在ts导入vue的单文件组件时(比如路由配置)，编辑器会报错：`找不到模块`。为了让ts能将 .vue 当成模块识别，需要在项目中创建`shims-vue.d.ts`文件，这样ts就会把 .vue 文件当成模块来解析了。

```ts
// src/shims-vue.d.ts
declare module '*.vue' {
  import Vue from 'vue';
  export default Vue;
}
```















