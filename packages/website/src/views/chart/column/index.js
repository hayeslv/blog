/*
 * @Author: Lvhz
 * @Date: 2021-11-04 10:05:08
 * @Description: Description
 */

export const getComponent = function () {
  // require.contexts第一个参数必须是直接字符串，变量无效
  const fileList = require.context("./components", true, /index.vue$/);
  const list = [];
  fileList.keys().forEach((item) => {
    // 导入函数根据文件名，导入文件内容
    const component = fileList(item).default;
    list.push(component);
  });
  return list;
};
