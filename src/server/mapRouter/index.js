/*
 * @Author: Lvhz
 * @Date: 2021-06-25 10:13:44
 * @Description: Description
 */
const Router = require('koa-router');
const { getBaiduMapApi } = require('./baiduMapApi');

// 多中间件
const mapApi = async(ctx, next) => {
  // if(ctx.url !== '/xxx') {
  //   ctx.throw(401)
  // }
  await next();
};

// 前缀
const mapRouter = new Router({ prefix: '/api/map' });

// 柱状图api
getBaiduMapApi(mapApi, mapRouter);


module.exports = mapRouter;
