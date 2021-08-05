/*
 * @Author: Lvhz
 * @Date: 2021-06-25 10:18:33
 * @Description: Description
 */
const getBaiduPointData = require('./jsonData/monitorPoint');


const getBaiduMapApi = (mapApi, mapRouter) => {
  mapRouter.get('/baidu/getBaiduPoint', mapApi, ctx => {
    ctx.body = {
      code: 200,
      data: getBaiduPointData
    };
  });
};
module.exports.getBaiduMapApi = getBaiduMapApi;
