/*
 * @Author: Lvhz
 * @Date: 2021-06-25 10:18:33
 * @Description: Description
 */
const getPieApi = (echartApi, echartsRouter) => {
  echartsRouter.get('/pie/1', echartApi, ctx => {
    ctx.body = {
      code: 200,
      data: [
        { name: '最多字段数1', value: 6543 }, 
        { name: '最多字段数2', value: 7543 }, 
        { name: '最多字段数4', value: 4543 }
      ]
    };
  });
  echartsRouter.get('/pie/2', echartApi, ctx => {
    ctx.body = {
      code: 200,
      data: [
        { name: '最多字段数1', value: 654 }, 
        { name: '最多字段数2', value: 753 }, 
        { name: '最多字段数4', value: 443 }
      ]
    };
  });
  echartsRouter.get('/pie/3', echartApi, ctx => {
    ctx.body = {
      code: 200,
      data: [
        { name: '白天亮灯', value: 6543, rate: '35%' }, 
        { name: '最多字段数2', value: 7543, rate: '25%' }, 
        { name: '最多字段数3', value: 7543, rate: '25%' }, 
        { name: '最多字段数5', value: 7543, rate: '25%' }, 
        { name: '最多字段数4', value: 4543, rate: '20%' }
      ]
    };
  });
};

module.exports.getPieApi = getPieApi;
