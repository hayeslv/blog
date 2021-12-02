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

// 文件API
const FileApi = {
  saveFileURL: (params) => {
    return http.post("/api/file/saveFileURL", params);
  },
}

// 文章API
const ArticleApi = {
  // 获取文章类型
  getArticleType: (params) => http.get("/api/article/getArticleType", params),
  // 获取文章信息
  getArticleInfo: (params) => http.get("/api/article/getArticleInfo", params),
  // 获取文章分组列表
  getArticleGroupList: (params) => http.get("/api/article/getArticleGroupList", params)
}

// 组件相关API
const ComponentApi = {
  getFileByCompName: (params) => {
    return http.get("/api/component/echart", params);
  },
}


export { CommonApi, ComponentApi, FileApi, ArticleApi };
