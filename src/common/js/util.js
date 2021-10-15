/*
 * @Author: Lvhz
 * @Date: 2020-07-27 09:28:37
 * @Descripttion: 工具
 */
// 获取窗口可视区高度
const getClientHeight = () => {
  let clientHeight = 0;
  if (document.body.clientHeight && document.documentElement.clientHeight) {
    clientHeight =
      document.body.clientHeight < document.documentElement.clientHeight ?
      document.body.clientHeight :
      document.documentElement.clientHeight;
  } else {
    clientHeight =
      document.body.clientHeight > document.documentElement.clientHeight ?
      document.body.clientHeight :
      document.documentElement.clientHeight;
  }
  return clientHeight;
};

// 获取窗口可视区宽度
export const getClientWidth = () => {
  let clientWidth = 0;
  if (document.body.clientWidth && document.documentElement.clientWidth) {
    clientWidth =
      document.body.clientWidth < document.documentElement.clientWidth ?
      document.body.clientWidth :
      document.documentElement.clientWidth;
  } else {
    clientWidth =
      document.body.clientWidth > document.documentElement.clientWidth ?
      document.body.clientWidth :
      document.documentElement.clientWidth;
  }
  return clientWidth;
};

// 获取当前窗口可视区/1080的比例
export const getHeightRate = () => {
  const height = getClientHeight();
  return Math.max(height, process.env.VUE_APP_MIN_HEIGHT) / 1080;
  // return Math.max(height, document.documentElement.clientHeight) / 1080;
};

// 获取当前窗口可视区/1920的比例
export const getWidthRate = () => {
  const width = getClientWidth();
  return width / 1920;
};
