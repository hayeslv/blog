## 安装ts

#### 全局安装

```bash
npm install -g typescript
```

#### 项目内安装ts

```bash
npm install typescript --save-dev
```

命令行运行 `tsc --init`  生成 `tsconfig.json`文件



## ts配置

#### 安装@vue/cli-plugin-typescript

其内部预置了ts-loader的配置，无需单独配置

```bash
npm install @vue/cli-plugin-typescript --save-dev
```

#### vue.config.js配置

添加extension，引入ts/tsx文件时不必加后缀

```js
module.exports = {
    chainWebpack: config => {
          config.resolve.extensions
            .add('ts')
            .add('tsx');
    }
}
```

#### ts-eslint配置

```bash
npm install @typescript-eslint/eslint-plugin @typescript-eslint/parser --save-dev
```

```bash
npm install @vue/eslint-config-typescript --save-dev
```

修改`.eslintrc.js`

```js
module.exports = {
    extends: [
        'plugin:vue/vue3-essential',
        'eslint:recommended',
        '@vue/typescript/recommended'
    ],
    plugins: [
        'vue',
        '@typescript-eslint'
    ],
    rules: {
        '@typescript-eslint/no-unused-vars': 'error',
        // 允许非空断言
        '@typescript-eslint/no-non-null-assertion': 'off',
        // 允许自定义模块和命名空间
        '@typescript-eslint/no-namespace': 'off',
        // 允许对this设置alias
        '@typescript-eslint/no-this-alias': 'off',
        // 允许使用any类型
        '@typescript-eslint/no-explicit-any': ['off'],
        ......
    }
}
```















