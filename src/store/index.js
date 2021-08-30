/*
 * @Author: Lvhz
 * @Date: 2021-08-17 10:32:13
 * @Description: 合并所有状态
 */

// 目录结构
// src
// --store
// ----modules
// ------user // 例如为用户的状态管理
// --------api 
// ----------index.js // 用户的api接口配置
// --------index.js // 用户的状态管理配置
// --------model.js // 用户的表单模块配置
// ----index.js // 合并所有状态

// import _ from 'lodash'
// const contexts = require.context('./modules', true);
// let modules = {};
// contexts.keys().forEach(key => {
//   if (_.includes(key, 'index.js') && !_.includes(key, 'api')) {
//     const module = contexts(key).default;
//     Object.assign(modules, module);
//   }
// });
// export default modules;

import { createStore } from 'vuex'
import app from './modules/app'
import user from './modules/user'
export default createStore({
  modules: {
    app,
    user
  }
})
