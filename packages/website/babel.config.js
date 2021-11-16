/*
 * @Author: Lvhz
 * @Date: 2021-09-23 15:30:15
 * @Description: Description
 */
module.exports = {
  presets: ["@vue/cli-plugin-babel/preset"],
  plugins: [
    // "transform-vue-jsx", "transform-runtime", //.babelrc文件中plugins选项里配置
    ["prismjs", {
      "languages": ["javascript", "css", "markup", "html"],
      "plugins": ["line-numbers", "highlight-keywords"],
      "theme": "default",
      "css": true
    }]
  ],
  ignore: ['/node_modules']
};
