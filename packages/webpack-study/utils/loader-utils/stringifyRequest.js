/*
 * @Author: Lvhz
 * @Date: 2021-12-17 15:46:52
 * @Description: Description
 */

const path = require('path');

// 匹配类型：./a  .\\a  ../a  ..\\a
const matchRelativePath = /^\.\.?[/\\]/;

function isAbsolutePath(str) {
  // posix是unix标准：全称“可移植操作系统接口”（Portable Operating System Interface of UNIX）
  // 判断是否为绝对路径：unix或window环境
  return path.posix.isAbsolute(str) || path.win32.isAbsolute(str);
}

function isRelativePath(str) {
  return matchRelativePath.test(str);
}

function stringifyRequest(loaderContext, request) {
  const splitted = request.split('!');
  // this.context：模块所在的目录。可以用作解析其他模块路径的上下文。
  const context = loaderContext.context || (loaderContext.options && loaderContext.options.context);

  return JSON.stringify(
    splitted
      .map(part => {
        // 首先，将单独路径与查询分开，因为查询可能再次包含路径
        const splittedPart = part.match(/^(.*?)(\?.*)/);
        const query = splittedPart ? splittedPart[2] : ''; // 拿到？和后面的内容（参数）
        let singlePath = splittedPart ? splittedPart[1] : part; // ？前面的内容（路径）

        if(isAbsolutePath(singlePath) && context) {
          // path.relative(from, to) 方法根据当前工作目录返回从 from 到 to 的相对路径
          singlePath = path.relative(context, singlePath);

          if(isAbsolutePath(singlePath)) {
            // 如果 singlePath 仍然匹配绝对路径，则 singlePath位于与上下文不同的驱动器上。
            // 在这种情况下，我们将其保留为“平台特定”，不更换任何分隔符
            return singlePath + query;
          }

          if(isRelativePath(singlePath) === false) {
            // 确保相对路径以 “./” 开头，否则它将进入模块目录查找（如node_modules）
            singlePath = './' + singlePath;
          }
        }

        return singlePath.replace(/\\/g, '/') + query;
      })
      .join('!')
  )
}

module.exports = stringifyRequest;