/*
 * @Author: Lvhz
 * @Date: 2021-04-12 15:34:25
 * @Description: Description
 */

const path = require('path');
const webpack = require('webpack');

const resolve = dir => path.join(__dirname, dir);

module.exports = {
  // publicPath: process.env.VUE_APP_BASEURL,

  chainWebpack: config => {
    config.resolve.alias
      .set('@view', resolve('src/view'))
      .set('@api', resolve('src/common/request/api'))
      .set('@comp', resolve('src/components'))
      .set('@layout', resolve('src/layout'))
      .set('@enum', resolve('src/common/enum'))
      .set('@config', resolve('src/common/config'))
      .set('@image', resolve('src/assets/image'));
  },

  //是否为 Babel 或 TypeScript 使用 thread-loader。该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建。
  parallel: require('os').cpus().length > 1,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000'
      },
      // 楚伟的机器
      '/pre': {
        target: 'http://139.159.156.184:9001'
      }
    }
  },

  css: {
    loaderOptions: {
      scss: {
        prependData: `@import "~@/style/base.scss";`
      }
    }
  },
  // 高德地图
  // configureWebpack(config) {
  //   config.externals = {
  //     'AMap': 'AMap' // 高德地图配置
  //   };
  // },
  // productionGzip: true,
  productionSourceMap: false,
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({ $: 'jquery', jQuery: 'jquery' })
    ]
  }
};
