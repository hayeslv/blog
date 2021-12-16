/*
 * @Author: Lvhz
 * @Date: 2021-12-14 15:02:35
 * @Description: Description
 */
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  mode: 'development', // 开发模式，不压缩代码，方便调试
  entry: {
    main: './src/index.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  // 手动配置 loader 路径
  resolveLoader: {
    modules: [path.resolve(__dirname, 'loader'), 'node_modules']
  },
  module: {
    rules: [
      // {
      //   test: /.(png|gif|jpe?g)$/,
      //   use: [
      //     {
      //       loader: 'file-loader-test',
      //       options: {
      //         name: `pic_[hash].[ext]`
      //       }
      //     }
      //   ]
      // },
      {
        test: /.js$/,
        use: [
          {
            loader: 'loader-test',
            options: `{
              name: 'js_[hash].[ext]'
            }`
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ]
}