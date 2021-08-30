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

const modulesFiles = require.context('./modules', true, /\.js$/)
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // set './app.js' => 'app'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})

export default createStore({
  modules
})
