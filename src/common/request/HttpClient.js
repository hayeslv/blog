/*
 * @Author: Lvhz
 * @Date: 2020-05-07 09:23:18
 * @Descripttion: axios请求方法
 */
import axios from 'axios';

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
      method: 'post'
    });
  }
  postForm(url, params = {}) {
    return this.request(url, {
      params,
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
  }
  put(url, params = {}) {
    return this.request(url, {
      data: params,
      method: 'put'
    });
  }
}
