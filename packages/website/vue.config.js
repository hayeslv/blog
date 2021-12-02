
/*
 * @Author: Lvhz
 * @Date: 2021-10-14 11:14:46
 * @Description: Description
 */

const path = require('path')
const resolve = (dir) => path.join(__dirname, dir);
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const isProduction = process.env.VUE_APP_ENV === 'production'; 

module.exports = {
  publicPath: '/',
  // outputDir: 'dist',
  // assetsDir: 'assets',
  productionSourceMap: false, // 生产环境不需要sourcemap
  devServer: {
    port: 7010,
    proxy: {
      '/api': {
        target: 'http://localhost:7011'
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
      // .options({
      //   minimize: false // 是否压缩
      // })
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
  configureWebpack: (config) => {
    const plugins = [];
    if (isProduction) {
      plugins.push(
        new CompressionWebpackPlugin({
          filename: "[path].gz[query]",
          algorithm: "gzip",
          test: /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i,
          threshold: 10240,
          minRatio: 0.8
        })
      )
    }
    config.plugins = [...config.plugins, ...plugins];
  },
  // configureWebpack: config => {
  //   if (isProduction) {
  //     // 开启gzip压缩
  //     config.plugins.push(new CompressionWebpackPlugin({
  //       algorithm: 'gzip',
  //       test: /\.js$|\.html$|\.json$|\.css/,
  //       threshold: 10240,
  //       minRatio: 0.8
  //     }))
  //   }
  // },
  css: {
    loaderOptions: {
      scss: {
        additionalData: `@import "~@/assets/styles/base.scss";`
      }
    }
  },
};
