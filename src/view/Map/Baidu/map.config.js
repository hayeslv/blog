/*
 * @Author: Lvhz
 * @Date: 2021-06-09 17:29:35
 * @Description: Description
 */

export default {
  zoom: 14,
  center: [113.120759, 23.035721], // 中心点经纬度
  ak: {
    baidu: '0eAzC8G8saZHgqxdbMeqpniNbkqb4Nzk'
  },
  popCloseImg: require('./img/close.png'),
  popPlayImg: require('./img/play.png'),
  // 监控点位图片
  // monitor00: require('./img/monitor-0-0.png'), // 正常监控
  // monitor01: require('./img/monitor-0-1.png'), // 正常监控（选中）
  monitor00: require('./img/monitor-2-0.png'), // 后端监控图标
  monitor01: require('./img/monitor-2-1.png'), // 后端监控图标（选中）
  monitor10: require('./img/monitor-1-0.png'), // 报警监控
  monitor11: require('./img/monitor-1-1.png'), // 报警监控（选中）
  // monitor20: require('./img/monitor-2-0.png'), // 后端监控图标
  // monitor21: require('./img/monitor-2-1.png'), // 后端监控图标（选中）
  // 图片大小（小屏使用）
  monitorImgWidth: 36,
  monitorImgHeight: 39
  // 图片大小(大屏使用)
  // monitorImgWidth: 114,
  // monitorImgHeight: 129
};
