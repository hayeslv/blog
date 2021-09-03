/*
 * @Author: Lvhz
 * @Date: 2020-10-20 14:38:04
 * @Descripttion: Descripttion
 */

// 获取url中的指定参数
export const getQueryString = name => {
  const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
  const r = window.location.search.substr(1).match(reg);
  if (r != null) {
    return decodeURIComponent(r[2]);
  }
  return null;
};

// 去除url的全部参数，并跳转至当前页面
export const deleteUrlAllQuery = () => {
  var url = window.location.href; //获取当前页面的url
  if (url.indexOf('?') !== -1) { //判断是否存在参数
    url = url.replace(/(\?|#)[^'"]*/, ''); //去除参数
    self.location = url;
  }
};


// 删除当前url中指定参数
export function deleteUrlQuery(names) {
  if (typeof (names) === 'string') {
    names = [names];
  }
  var loca = window.location;
  var obj = {};
  var arr = loca.search.substr(1).split('&');
  //获取参数转换为object
  for (let i = 0; i < arr.length; i++) {
    arr[i] = arr[i].split('=');
    obj[arr[i][0]] = arr[i][1];
  }
  //删除指定参数
  for (let i = 0; i < names.length; i++) {
    delete obj[names[i]];
  }
  //重新拼接url
  var url = loca.origin + 
            loca.pathname + 
            (IsNullObject(obj) ? '/' : '?') + 
            // eslint-disable-next-line no-useless-escape
            JSON.stringify(obj).replace(/[\"\{\}]/g, '').replace(/\:/g, '=').replace(/\,/g, '&');
  return url;
}

// 跳转页面
export function jumpPage(url) {
  self.location = url;
}

// 判断对象是否为空
export function IsNullObject(obj) {
  const arr = Object.keys(obj);
  return arr.length === 0;
}

// 获取当前日期 xxxx-xx-xx
export const getNowDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}-${add0(month)}-${add0(day)}`;
};
// 获取当前月份 xxxx-xx
export const getNoWMonth = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  return `${year}-${add0(month)}`;
};

// 今天是星期几
export const getWeekDate = () => {
  const date = new Date();
  const weekDay = date.getDay();
  let str = '';
  switch (weekDay) {
    case 0: str = '星期日'; break;
    case 1: str = '星期一'; break;
    case 2: str = '星期二'; break;
    case 3: str = '星期三'; break;
    case 4: str = '星期四'; break;
    case 5: str = '星期五'; break;
    case 6: str = '星期六'; break;
  }
  return str;
};

// 获取当前时分秒  xx:xx:xx
export const getNowTime = () => {
  const date = new Date();
  const hour = date.getHours();
  const min = date.getMinutes();
  const sec = date.getSeconds();
  return `${add0(hour)}:${add0(min)}:${add0(sec)}`;
};

const add0 = num => {
  if (parseInt(num) < 10) return `0${num}`;
  return num;
};

// 查看原型链
export function getProtoChain(obj) {
  const protoChain = [];
  while (obj) {
    protoChain.push(obj);
    obj = Object.getPrototypeOf(obj);
  }
  return protoChain;
}
