/*
 * @Author: Lvhz
 * @Date: 2021-06-25 10:13:44
 * @Description: Description
 */
const Router = require('koa-router');
const { getColumnApi } = require('./columnApi');
const { getLineApi } = require('./lineApi');
const { getPieApi } = require('./pieApi');
const { getOtherApi } = require('./otherApi');

// 多中间件
const echartApi = async(ctx, next) => {
  // if(ctx.url !== '/xxx') {
  //   ctx.throw(401)
  // }
  await next();
};

// 前缀
const echartsRouter = new Router({ prefix: '/api/echart' });

// 柱状图api
getColumnApi(echartApi, echartsRouter);
// 折线图api
getLineApi(echartApi, echartsRouter);
// 饼图api
getPieApi(echartApi, echartsRouter);
// 其他图标api
getOtherApi(echartApi, echartsRouter);


module.exports = echartsRouter;
