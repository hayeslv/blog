/*
 * @Author: Lvhz
 * @Date: 2020-05-21 11:22:49
 * @Descripttion: API
 */
import http from "./index.js";
import HttpClient from "./HttpClient.js";

// 公共API
const CommonApi = {
  // 示例：另外一个系统的接口时
  normalUpload: (params) => {
    const httpClient = new HttpClient();
    return httpClient.formData("/api/base/v1/file/normalUpload", params);
  },
  // 初始化数据库
  initDB: (params) => {
    return http.get("/api/dbdata/initdb", params);
  },
  // 重置数据
  resetDB: (params) => {
    return http.get("/api/dbdata/mockdata", params);
  },
  // 文件上传（独立的文件）
  uploadfile: (params, config = {}) => {
    return http.postFile("/api/uploadfile", params, config);
  },
  // 文件切片上传
  uploadfileChunk: (params, config = {}) => {
    return http.postFile("/api/uploadfileChunk", params, config);
  },
  // 切片合并
  mergefile: (params) => {
    return http.post("/api/mergefile", params);
  },
  // 检查文件
  checkfile: (params) => {
    return http.post("/api/checkfile", params);
  },
  // 存储文件路径
  saveFileUrl: (params) => {
    return http.post("/api/saveFileUrl", params);
  },
};

// 组件相关API
const ComponentApi = {
  getFileByCompName: (params) => {
    return http.get("/api/component/echart", params);
  },
}

// 用户API
const UserApi = {
  // 登录
  login: (params) => {
    return http.get("/api/login", params);
  },
};

export { UserApi, CommonApi, ComponentApi };
