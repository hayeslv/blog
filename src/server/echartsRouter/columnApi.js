/*
 * @Author: Lvhz
 * @Date: 2021-06-25 10:18:33
 * @Description: Description
 */
const getColumnApi = (echartApi, echartsRouter) => {
  // 柱状图api
  echartsRouter.get('/column/1', echartApi, ctx => {
    ctx.body = {
      code: 200,
      data: [
        { name: '天元区', value: 5000 },
        { name: '芦淞区', value: 2200 },
        { name: '荷塘区', value: 1000 },
        { name: '石峰区', value: 500 },
        { name: '云龙区', value: 1200 }
      ]
    };
  });
  echartsRouter.get('/column/2', echartApi, ctx => {
    ctx.body = {
      code: 200,
      data: [
        { name: '今日结案', value: 3456 },
        { name: '今日立案', value: 3456 },
        { name: '今日上报', value: 8456 }
      ]
    };
  });
  echartsRouter.get('/column/3', echartApi, ctx => {
    ctx.body = {
      code: 200,
      data: [
        { name: '景观管理', liAnNum: 3456, jieAnNum: 3000 },
        { name: '环境管理', liAnNum: 3156, jieAnNum: 3300 },
        { name: '市政管理', liAnNum: 2356, jieAnNum: 2100 }
      ]
    };
  });
};

module.exports.getColumnApi = getColumnApi;
