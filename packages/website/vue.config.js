
/*
 * @Author: Lvhz
 * @Date: 2021-10-14 11:14:46
 * @Description: Description
 */

const path = require('path')
const resolve = (dir) => path.join(__dirname, dir);
module.exports = {
  publicPath: '/',
  // outputDir: 'dist',
  // assetsDir: 'assets',
  devServer: {
    port: 7010,
    proxy: {
      '/api': {
        // target: 'http://localhost:7001'
        target: 'http://39.98.132.28:7001'
      }
    }
  },
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@image', resolve('src/assets/images'))
      .set('@api', resolve('src/server/request/api.js'))

    // 添加解析md的loader
    config.module
      .rule('md')
      .test(/\.md$/)
      .use('html-loader')
      .loader('html-loader')
      .options({
        minimize: false
      })
      .end()

    // ts、tsx支持 
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
  css: {
    loaderOptions: {
      scss: {
        additionalData: `@import "~@/assets/styles/base.scss";`
      }
    }
  },
};
