/* eslint-disable prettier/prettier */
/*
 * @Author: Lvhz
 * @Date: 2021-10-14 11:14:46
 * @Description: Description
 */

const path = require("path");
module.exports = {
  devServer: {
    port: 9888,
  },
  chainWebpack: (config) => {
    // 入口文件
    config
      .entry("App")
      .clear()
      .add(path.resolve(__dirname, './src/main.js'))
      .end();
    // 添加解析md的loader
    config.module
      .rule('md2vue')
      .test(/\.md$/)
      .use('vue-loader')
      .loader('vue-loader')
      .end()
      .use('md-loader')
      .loader(path.resolve(__dirname, '../md-loader/src/index.js'))
      .end()
  },
};
