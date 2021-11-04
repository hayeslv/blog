/* eslint-disable prettier/prettier */
/*
 * @Author: Lvhz
 * @Date: 2021-10-14 11:14:46
 * @Description: Description
 */

const path = require('path')
const resolve = (dir) => path.join(__dirname, dir);
module.exports = {
  devServer: {
    port: 7777,
  },
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@image', resolve('src/assets/images'))

    // config.module
      // .rule('md')
      // .test(/\.md$/)
      // .use('html-loader')
      // .loader('html-loader')
      // .end()
      // .use('markdown-loader')
      // .loader(path.resolve(__dirname, '../markdown-loader/src/index.js'))
      // .end()

    // 添加解析md的loader
    config.module
      .rule('md')
      .test(/\.md$/)
      .use('html-loader')
      .loader('html-loader')
      .end()
      // .use('markdown-loader')
      // .loader('markdown-loader')
      // .end()

    // config
    //   // app entry
    //   .entry('app')
    //   .clear()
    //   .add(path.resolve(__dirname, './src/main.js'))
    //   .end()

    // 添加解析 md 的 loader
    // config.module
    //   .rule('md2vue')
    //   .test(/\.md$/)
    //   .use('vue-loader')
    //   .loader('vue-loader')
    //   .end()
    //   .use('markdown-loader')
    //   .loader(path.resolve(__dirname, '../markdown-loader/src/index.js'))
    //   .end()
    //   .use('md-loader')
    //   .loader(path.resolve(__dirname, '../md-loader/src/index.js'))
    //   .end()

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
  },
};
