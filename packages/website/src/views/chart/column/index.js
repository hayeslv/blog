/*
 * @Author: Lvhz
 * @Date: 2021-11-04 10:05:08
 * @Description: Description
 */

export const getComponent = function () {
  const fileList = require.context("./components", true, /index.vue$/);
  const list = [];
  fileList.keys().forEach((item) => {
    // 导入函数根据文件名，导入文件内容
    const component = fileList(item).default;
    list.push(component);
  });
  return list;
};
