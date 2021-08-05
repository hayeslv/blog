/*
 * @Author: Lvhz
 * @Date: 2021-06-25 10:18:33
 * @Description: Description
 */
const getLineApi = (echartApi, echartsRouter) => {
  // 折线图api
  echartsRouter.get('/line/1', echartApi, ctx => {
    ctx.body = {
      code: 200,
      data: [
        { time: 0, sbNum: 100, laNum: 50, jaNum: 233 },
        { time: 1, sbNum: 138, laNum: 50, jaNum: 10 },
        { time: 2, sbNum: 350, laNum: 60, jaNum: 20 },
        { time: 3, sbNum: 173, laNum: 70, jaNum: 12 },
        { time: 4, sbNum: 180, laNum: 80, jaNum: 13 },
        { time: 5, sbNum: 150, laNum: 90, jaNum: 50 },
        { time: 6, sbNum: 178, laNum: 30, jaNum: 70 },
        { time: 7, sbNum: 100, laNum: 40, jaNum: 50 },
        { time: 8, sbNum: 138, laNum: 50, jaNum: 40 },
        { time: 9, sbNum: 350, laNum: 60, jaNum: 60 },
        { time: 10, sbNum: 180, laNum: 60, jaNum: 100 },
        { time: 11, sbNum: 233, laNum: 70, jaNum: 200 }
      ]
    };
  });
  echartsRouter.get('/line/2', echartApi, ctx => {
    ctx.body = {
      code: 200,
      data: [
        { time: 0, number: 100 },
        { time: 1, number: 138 },
        { time: 2, number: 350 },
        { time: 3, number: 173 },
        { time: 4, number: 180 },
        { time: 5, number: 150 },
        { time: 6, number: 100 },
        { time: 7, number: 138 },
        { time: 8, number: 100 },
        { time: 9, number: 173 },
        { time: 10, number: 160 }
      ]
    };
  });
  echartsRouter.get('/line/3', echartApi, ctx => {
    ctx.body = {
      code: 200,
      data: [
        { date: '11时', realNum: '21', needNum: '18' },
        { date: '12时', realNum: '19', needNum: '18' },
        { date: '13时', realNum: '22', needNum: '18' },
        { date: '14时', realNum: '25', needNum: '12' },
        { date: '15时', realNum: '21', needNum: '20' },
        { date: '16时', realNum: '21', needNum: '20' },
        { date: '17时', realNum: '13', needNum: '18' },
        { date: '18时', realNum: '17', needNum: '14' },
        { date: '19时', realNum: '15', needNum: '16' },
        { date: '20时', realNum: '14', needNum: '20' }
      ]
    };
  });
};

module.exports.getLineApi = getLineApi;
