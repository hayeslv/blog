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
    const { data } = response;
    if (parseInt(data.code) !== responseCode.SUCCESS) {
      console.error(response.msg || '获取源头失败');
      return data;
    }
    return data;
  },
  error => {
    console.error(error);
    return error.response.data;
  }
);

export default httpClient;
