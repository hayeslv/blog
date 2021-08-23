/*
 * @Author: Lvhz
 * @Date: 2020-05-07 09:23:18
 * @Descripttion: axios请求方法
 */
import axios from 'axios';

function getCookie(name){
  var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
  arr = document.cookie.match(reg)
  if(arr) {
    return unescape(arr[2]);
  }
  return null;
}

export default class HttpClient {
  constructor(config) {
    this.httpInstance = axios.create(config);
  }
  setHeader(key, value) {
    this.httpInstance.defaults.headers.common[key] = value;
  }
  request(url, config) {
    return this.httpInstance.request({
      url,
      ...config
    });
  }
  get(url, params = {}) {
    return this.request(url, {
      params,
      method: 'get'
    });
  }
  delete(url, params = {}) {
    return this.request(url, {
      params,
      method: 'delete'
    });
  }
  post(url, params = {}) {
    return this.request(url, {
      data: params,
      method: 'post',
    });
  }
  formPost(url, params = {}) {
    return this.request(url, {
      data: params || {},
      method: 'post',
      transformRequest: [
        function(data) {
          let ret = '';
          for (const it in data) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&';
          }
          ret = ret.substring(0, ret.lastIndexOf('&'));
          return ret;
        }
      ],
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'x-csrf-token': getCookie("csrfToken") // 前后端不分离的情况加每次打开客户端，egg会直接在客户端的 Cookie 中写入密钥 ，密钥的 Key 就是 'scrfToken' 这个字段，所以直接获取就好了
      }
    });
  }
  // 针对文件图片等二进制数据，需要使用到FormData入参
  postFile(url, params = {}, config = {}) {
    let formData = new FormData()
    for(let key in params) {
      if(Object.prototype.hasOwnProperty.call(params, key)) {
        let ele = params[key]
        formData.append(key, ele)
      }
    }
    return this.request(url, {
      data: formData,
      params: formData,
      method: 'post',
      headers: {
        'Content-Type': 'multipart/form-data',
        'x-csrf-token': getCookie("csrfToken") // 前后端不分离的情况加每次打开客户端，egg会直接在客户端的 Cookie 中写入密钥 ，密钥的 Key 就是 'scrfToken' 这个字段，所以直接获取就好了
      },
      transformRequest: [
        function(){
          return formData;
        }
      ],
      ...config
    });
  }
  put(url, params = {}) {
    return this.request(url, {
      data: params,
      method: 'put'
    });
  }
}
