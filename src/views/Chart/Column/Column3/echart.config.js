/*
 * @Author: Lvhz
 * @Date: 2021-01-21 11:12:44
 * @Description: Description
 */
const echarts = require('echarts');

const nameList = ['立案数', '结案数'];
const colorList = ['#00baff', '#008065'];

// const dataList = [
//   { name: '景观管理', liAnNum: 3456, jieAnNum: 3000 },
//   { name: '环境管理', liAnNum: 3156, jieAnNum: 3300 },
//   { name: '市政管理', liAnNum: 2356, jieAnNum: 2100 }
// ];

// const seriesDataList1 = dataList.map(item => item.liAnNum);
// const seriesDataList2 = dataList.map(item => item.jieAnNum);
// const typeNameList = dataList.map(item => item.name);

const getDataList = dataList => {
  let seriesDataList1 = [], seriesDataList2 = [], typeNameList = [];
  if (!dataList || !Array.isArray(dataList)) return { seriesDataList1, seriesDataList2, typeNameList };
  seriesDataList1 = dataList.map(item => item.liAnNum);
  seriesDataList2 = dataList.map(item => item.jieAnNum);
  typeNameList = dataList.map(item => item.name);
  return { seriesDataList1, seriesDataList2, typeNameList };
};

export function getOption(dataList) {
  const { seriesDataList1, seriesDataList2, typeNameList } = getDataList(dataList);
  return {
    backgroundColor: 'transparent',
    color: colorList,
    grid: {
      left: '3%',
      right: '8%',
      top: '0%',
      bottom: '15%',
      containLabel: true
    },
    legend: {
      data: nameList,
      itemGap: 10,
      icon: 'none',
      bottom: '0%',
      left: 'center',
      itemHeight: 10,
      itemWidth: 20,
      formatter: function(value) {
        let key = 0;
        for (let i = 0; i < nameList.length; i++) {
          if (value === nameList[i]) key = i;
        }
        return `{${key}|}{word|${value}}`;
      },
      textStyle: {
        color: '#fff',
        fontSize: 20,
        rich: { // 修复legend样式，使之不会渐变
          0: {
            width: 16,
            height: 6,
            backgroundColor: colorList[0]
          },
          1: {
            width: 16,
            height: 6,
            backgroundColor: colorList[1]
          },
          word: {
            color: '#bbb',
            fontSize: 12,
            padding: [0, 0, 0, 6]
          }
        }
      }
    },
    toolbox: {
      show: true
    },
    calculable: true,
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    textStyle: {
      color: '#fff'
    },
    xAxis: {
      type: 'value',
      boundaryGap: [0, 0.01],
      splitLine: { show: false }, //去除网格线
      axisLabel: {
        textStyle: {
          color: 'rgba(255,255,255,0.65)',
          fontSize: 12
        }
      }
    },
    yAxis: {
      type: 'category',
      data: typeNameList || [],
      axisLabel: {
        textStyle: {
          color: 'rgba(255,255,255,0.65)',
          fontSize: 12
        }
      }
    },
    series: [
      {
        name: nameList[0],
        type: 'bar',
        data: seriesDataList1 || [],
        barWidth: 10,
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
              {
                offset: 0,
                color: 'transparent' //柱图渐变色起点颜色
              },
              {
                offset: 0.8,
                color: colorList[0] //柱图渐变色终点颜色
              }
            ])
          }
        }
      },
      {
        name: nameList[1],
        type: 'bar',
        data: seriesDataList2 || [],
        barWidth: 10,
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
              {
                offset: 0,
                color: 'transparent' //柱图渐变色起点颜色
              },
              {
                offset: 0.8,
                color: colorList[1] //柱图渐变色终点颜色
              }
            ])
          }
        }
      }
    ]
  };
}
