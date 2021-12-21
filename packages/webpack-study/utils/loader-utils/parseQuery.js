/*
 * @Author: Lvhz
 * @Date: 2021-12-15 20:05:21
 * @Description: Description
 */
const JSON5 = require('json5');

const specialValues = {
  null: null,
  true: true,
  false: false,
};

// 字符串转json
function parseQuery(query) {
  // 当使用loader时的options为字符串时，接收方this.query也会接受是字符串，并以?开头
  if(query.substr(0, 1) !== '?') {
    throw new Error(
      "A valid query string passed to parseQuery should begin with '?'"
    )
  }

  query = query.substr(1); // 去掉问号

  if(!query) return {};

  // 字符串内包含的是json
  if(query.substr(0, 1) === '{' && query.substr(-1) === '}') return JSON5.parse(query);

  // 根据 , & 这两个符号分隔字符串
  //! 注：像是处理类似url的字符串
  const queryArgs = query.split(/[,&]/g);
  const result = {};

  queryArgs.forEach(arg => {
    const idx = arg.indexOf('=');

    if(idx >= 0) { // key=value
      let name = arg.substr(0, idx);
      let value = decodeURIComponent(arg.substr(idx + 1));

      // 将特殊字符串转成特殊字符
      if(Object.prototype.hasOwnProperty.call(specialValues, value)) {
        value = specialValues[value]
      }

      //! 注：处理name为 'key[]'，这种类型的字符串
      if(name.substr(-2) === '[]') {
        name = decodeURIComponent(name.substr(0, name.length - 2));

        if(!Array.isArray(result[name])) {
          result[name] = [];
        }

        result[name].push(value);
      } else {
        if(arg.substr(0, 1) === '-') { // -string
          result[decodeURIComponent(arg.substr(1))] = false;
        } else if(arg.substr(0, 1) === '+') { // +string
          result[decodeURIComponent(arg.substr(1))] = true;
        } else {
          result[decodeURIComponent(arg)] = true;
        }
      }
    }
  })
}

module.exports = parseQuery;