/*
 * @Author: Lvhz
 * @Date: 2021-12-20 10:19:31
 * @Description: Description
 */
const path = require('path');

function isUrlRequest(url, root) {
  // 如果出现以下情况，则 url 不是请求

  // 1.它是一个绝对 url，并且不是 windows 下的路径(如："C:/dir/file")
  if(/^[a-z][a-z0-9+.-]*:/i.test(url) && !path.win32.isAbsolute(url)) {
    return false;
  }

  // 2.它是一个相对协议： 以 // 开头
  if(/^\/\//.test(url)) {
    return false;
  }

  // 3.它像是某个模板的url
  if(/^[{}[\]#*;,'§$%&(=?`´^°<>]/.test(url)) {
    return false;
  }

  // 4.如果未设置 root，并且它是相对root的“相对请求”，则它也不是请求
  if((root === undefined || root === false) && /^\//.test(url)) {
    return false;
  }

  return true;
}

module.exports = isUrlRequest;