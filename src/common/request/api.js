/*
 * @Author: Lvhz
 * @Date: 2020-05-21 11:22:49
 * @Descripttion: API
 */
import http from './index.js';

// 公共API
const CommonApi = {
  // 重置数据
  resetDB: params => {
    return http.get('/dbdata/mockdata', params);
  },
  // 文件上传（独立的文件）
  uploadfile: (params, config = {}) => {
    return http.postFile('/uploadfile', params, config);
  },
  // 文件切片上传
  uploadfileChunk: (params, config = {}) => {
    return http.postFile('/uploadfileChunk', params, config);
  },
  // 切片合并
  mergefile: params => {
    return http.post('/mergefile', params);
  },
  // 检查文件
  checkfile: params => {
    return http.post('/checkfile', params);
  }
}

// 用户API
const UserApi = {
  // 登录
  login: params => {
    return http.get('/login', params);
  }
}

// 柱状图API
const ColumnApi = {
  // 柱状图1
  getColumn_1_data: params => {
    return http.get('/echart/column/1', params);
  },
  // 柱状图2
  getColumn_2_data: params => {
    return http.get('/echart/column/2', params);
  },
  // 柱状图3
  getColumn_3_data: params => {
    return http.get('/echart/column/3', params);
  }
};

// 折线图API
const LineApi = {
  // 折线图1
  getLine_1_data: params => {
    return http.get('/echart/line/1', params);
  },
  // 折线图2
  getLine_2_data: params => {
    return http.get('/echart/line/2', params);
  },
  // 折线图3
  getLine_3_data: params => {
    return http.get('/echart/line/3', params);
  }
};

// 饼图API
const PieApi = {
  getPie_1_data: params => {
    return http.get('/echart/pie/1', params);
  },
  getPie_2_data: params => {
    return http.get('/echart/pie/2', params);
  },
  getPie_3_data: params => {
    return http.get('/echart/pie/3', params);
  }
};

// 其他图表API
const OtherApi = {
  getOther_1_data: params => {
    return http.get('/echart/other/1', params);
  },
  getOther_2_data: params => {
    return http.get('/echart/other/2', params);
  }
};

// 百度地图API

const BaiduApi = {
  // 获取地图点位
  getBaiduPoint: params => {
    return http.get('/map/baidu/getBaiduPoint', params);
  }
};

export {
  UserApi,
  CommonApi,
  ColumnApi,
  LineApi,
  PieApi,
  OtherApi,
  BaiduApi
};
