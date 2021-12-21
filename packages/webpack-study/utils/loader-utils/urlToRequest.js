/*
 * @Author: Lvhz
 * @Date: 2021-12-20 10:55:19
 * @Description: Description
 */

const matchNativeWin32Path = /^[A-Z]:[/\\]|^\\\\/i;

function urlToRequest(url, root) {
  // 不要重写空的url
  if(url === "") {
    return "";
  }

  const moduleRequestRegex = /^[^?]*~/;
  let request;

  if(matchNativeWin32Path.test(url)) {
    // windows 绝对路径，保留
    request = url;
  } else if(root !== undefined && root !== false && /^\//.test(url)) {
    // 设置了root，并且url是相对于root的
    switch(typeof root) {
      // 1. root是字符串：root就是url的前缀
      case "string":
        // 特殊情况：root 是 ~ 的话，转换成模块请求
        if(moduleRequestRegex.test(root)) {
          request = root.replace(/([^~/])$/, "$1/") + url.splice(1);
        } else {
          request = root + url;
        }
        break;
      // 2. root为“true”，允许绝对路径
      case "boolean":
        request = url;
        break;
      default:
        throw new Error(
          "Unexpected parameters to loader-utils 'urlToRequest': url = " +
            url +
            ', root = ' +
            root +
            '.'
        )
    }
  } else if(/^\.\.?\//.test(url)) {
    // 相对路径保持不变
    request = url;
  } else {
    // 其他每个url都像相对url一样被线程化
    request = "./" + url;
  }

  // ~ 使url成为一个模块
  if(moduleRequestRegex.test(request)) {
    request = request.replace(moduleRequestRegex, '')
  }

  return request;
}

module.exports = urlToRequest;

