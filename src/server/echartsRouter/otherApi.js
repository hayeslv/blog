/*
 * @Author: Lvhz
 * @Date: 2021-06-25 10:18:33
 * @Description: 其他图表数据
 */
const getOtherApi = (echartApi, echartsRouter) => {
  // 折线图api
  echartsRouter.get('/other/1', echartApi, ctx => {
    ctx.body = {
      code: 200,
      data: [
        { 'id': 1, 'temp': '25', 'date': '00时', 'standardNum': 200, 'noStandardNum': 155 },
        { 'id': 2, 'temp': '22', 'date': '01时', 'standardNum': 155, 'noStandardNum': 200 },
        { 'id': 3, 'temp': '26', 'date': '02时', 'standardNum': 352, 'noStandardNum': 3 },
        { 'id': 4, 'temp': '23', 'date': '03时', 'standardNum': 200, 'noStandardNum': 155 },
        { 'id': 5, 'temp': '20', 'date': '04时', 'standardNum': 352, 'noStandardNum': 3 },
        { 'id': 6, 'temp': '21', 'date': '05时', 'standardNum': 355, 'noStandardNum': 0 },
        { 'id': 7, 'temp': '25', 'date': '06时', 'standardNum': 300, 'noStandardNum': 55 },
        { 'id': 8, 'temp': '22', 'date': '07时', 'standardNum': 352, 'noStandardNum': 3 },
        { 'id': 9, 'temp': '26', 'date': '08时', 'standardNum': 354, 'noStandardNum': 1 },
        { 'id': 10, 'temp': '23', 'date': '09时', 'standardNum': 352, 'noStandardNum': 3 },
        { 'id': 11, 'temp': '20', 'date': '10时', 'standardNum': 355, 'noStandardNum': 40 },
        { 'id': 12, 'temp': '21', 'date': '11时', 'standardNum': 355, 'noStandardNum': 40 },
        { 'id': 13, 'temp': '25', 'date': '12时', 'standardNum': 350, 'noStandardNum': 5 },
        { 'id': 14, 'temp': '22', 'date': '13时', 'standardNum': 352, 'noStandardNum': 3 },
        { 'id': 15, 'temp': '26', 'date': '14时', 'standardNum': 354, 'noStandardNum': 1 },
        { 'id': 16, 'temp': '23', 'date': '15时', 'standardNum': 352, 'noStandardNum': 3 },
        { 'id': 17, 'temp': '25', 'date': '16时', 'standardNum': 355, 'noStandardNum': 50 },
        { 'id': 18, 'temp': '22', 'date': '17时', 'standardNum': 355, 'noStandardNum': 50 },
        { 'id': 19, 'temp': '26', 'date': '18时', 'standardNum': 355, 'noStandardNum': 50 },
        { 'id': 20, 'temp': '23', 'date': '19时', 'standardNum': 355, 'noStandardNum': 0 },
        { 'id': 21, 'temp': '20', 'date': '20时', 'standardNum': 350, 'noStandardNum': 5 },
        { 'id': 22, 'temp': '21', 'date': '21时', 'standardNum': 352, 'noStandardNum': 3 },
        { 'id': 23, 'temp': '25', 'date': '22时', 'standardNum': 354, 'noStandardNum': 1 },
        { 'id': 24, 'temp': '25', 'date': '23时', 'standardNum': 352, 'noStandardNum': 3 }
      ]
    };
  });
  echartsRouter.get('/other/2', echartApi, ctx => {
    ctx.body = {
      code: 200,
      data: [
        // { name: '抛洒滴漏', value: 333 },
        // { name: '违法排污', value: 113 },
        // { name: '违法广告', value: 234 },
        // { name: '交通信号灯', value: 112 },
        // { name: '渣土乱倒', value: 444 },
        // { name: '垃圾满溢', value: 222 }
        { name: '报告性案卷', value: 2 },
        { name: '非法张贴小广告', value: 7 },
        { name: '果皮箱', value: 4 },
        { name: '乱堆物料', value: 10 },
        { name: '机动车乱停放', value: 16 },
        { name: '店外经营', value: 4 }
      ]
    };
  });
};

module.exports.getOtherApi = getOtherApi;
