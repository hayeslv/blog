/* eslint-disable prettier/prettier */
/*
 * @Author: Lvhz
 * @Date: 2021-10-14 11:14:46
 * @Description: Description
 */

module.exports = {
  devServer: {
    port: 9888,
  },
  chainWebpack: (config) => {
    // 添加解析md的loader
    config.module
      .rule('md')
      .test(/\.md$/)
      .use('html-loader')
      .loader('html-loader')
      .end()
      .use('markdown-loader')
      .loader('markdown-loader')
      .end()
  },
};
