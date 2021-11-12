/*
 * @Author: Lvhz
 * @Date: 2021-09-03 15:22:23
 * @Description: Description
 */

module.exports = {
  "root": true,
  env: {
    browser: true, //浏览器的全局变量
    node: true, //Node.js 全局变量和 Node.js 作用域
    es6: true //支持除模块外所有 ECMAScript 6 特性（该选项会自动设置 ecmaVersion 解析器选项为 6）。
  },
  "extends": [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    '@vue/typescript',
  ],
  "parserOptions": {
    "parser": "babel-eslint",
    parser: '@typescript-eslint/parser',
  },
  "rules": {},
  overrides: [
    {
      files: [
        "**/__tests__/*.{j,t}s?(x)",
        "**/tests/unit/**/*.spec.{j,t}s?(x)"
      ],
      env: {
        jest: true
      }
    }
  ],
  plugins: ['@typescript-eslint'],
}
