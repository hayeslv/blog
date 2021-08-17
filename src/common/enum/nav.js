/*
 * @Author: Lvhz
 * @Date: 2021-08-17 15:47:41
 * @Description: Description
 */
// 头部导航
export const headerNav = (function() {
  const { routes: routeList } = require('@/router');
  return [
    {
      index: '1',
      title: '图表示例',
      navList: routeList.filter(item => item.meta && item.meta.type === 'chart').map(item => {
        return {
          index: item.path,
          title: item.meta && item.meta.title,
          icon: item.meta && item.meta.icon
        };
      })
      //! 数据示例
      // navList: [
      //   { index: '/chart/column', title: '柱状图', icon: 'el-icon-s-data' },
      //   { index: '/chart/line', title: '折线图', icon: 'el-icon-s-marketing' },
      //   { index: '/chart/pie', title: '饼图', icon: 'el-icon-pie-chart' },
      //   { index: '/chart/other', title: '其他图' }
      // ]
    },
    {
      index: '2',
      title: '地图示例'
    },
    {
      index: '3',
      title: '组件',
      navList: routeList.filter(item => item.meta && item.meta.type === 'component').map(item => {
        return {
          index: item.path,
          title: item.meta && item.meta.title,
          icon: item.meta && item.meta.icon
        };
      })
    },
    {
      index: '4',
      title: '规范',
      navList: routeList.filter(item => item.meta && item.meta.type === 'standard').map(item => {
        return {
          index: item.path,
          title: item.meta && item.meta.title,
          icon: item.meta && item.meta.icon
        };
      })
    }
    // {
    //   index: '3',
    //   title: '规范',
    //   child: [
    //     {
    //       index: '3-1',
    //       title: '可视化图表规范',
    //       navList: [

    //       ]
    //     }
    //   ]
    // }
  ];
})();
