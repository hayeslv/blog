/*
 * @Author: Lvhz
 * @Date: 2020-07-27 09:28:37
 * @Descripttion: 工具
 */ 
// 获取窗口可视区高度
const getClientHeight = () => {
  let clientHeight = 0;
  if (document.body.clientHeight && document.documentElement.clientHeight) {
    clientHeight = (document.body.clientHeight < document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
  } else {
    clientHeight = (document.body.clientHeight > document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
  }
  return clientHeight;
};

// 获取窗口可视区宽度
export const getClientWidth = () => {
  let clientWidth = 0;
  if (document.body.clientWidth && document.documentElement.clientWidth) {
    clientWidth = (document.body.clientWidth < document.documentElement.clientWidth) ? document.body.clientWidth : document.documentElement.clientWidth;
  } else {
    clientWidth = (document.body.clientWidth > document.documentElement.clientWidth) ? document.body.clientWidth : document.documentElement.clientWidth;
  }
  return clientWidth;
};

// 获取页面缩放比例
export const scaleRate = () => {
  const scaleStr = window.document.body.style.transform;
  const reg = /scale\((.*),(.*)\)/;
  reg.test(scaleStr);
  console.log(RegExp.$1);
  console.log(RegExp.$2);
};

// 获取当前窗口可视区的比例
export const getHeightRate = () => {
  const height = getClientHeight();
  return height / window.screen.height;
};

// 获取当前窗口可视区的比例
export const getWidthRate = () => {
  const width = getClientWidth();
  return width / window.screen.width;
};


// 获取url中的参数
export const getQueryString = name => {
  const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
  const r = window.location.search.substr(1).match(reg);
  if (r != null) {
    return decodeURIComponent(r[2]);
  }
  return null;
};
