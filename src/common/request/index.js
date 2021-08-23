/*
 * @Author: Lvhz
 * @Date: 2020-05-07 09:23:14
 * @Descripttion: 业务层面处理请求/响应
 */
// import qs from 'qs'
import HttpClient from './HttpClient.js';
import { responseCode } from './constant.js';

const config = {
  baseURL: process.env.VUE_APP_API_URL,
  timeout: 60000
};

const httpClient = new HttpClient(config);
const instance = httpClient.httpInstance;
instance.defaults.headers.post['Content-Type'] = 'application/json';

// 请求拦截器 管理token
instance.interceptors.request.use(
  config => {
    config.headers['accessToken'] = localStorage.getItem('accessToken');
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 响应拦截
instance.interceptors.response.use(
  response => {
    // header config在这里处理就可以了，应用层只需要数据
    const { data } = response;
    if (parseInt(data.code) !== responseCode.SUCCESS) {
      console.error(response.msg || '获取源头失败');
      return data;
    }
    return data;
  },
  error => {
    console.error(error);
    return {};
  }
);

export default httpClient;
