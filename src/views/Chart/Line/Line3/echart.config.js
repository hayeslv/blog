/*
 * @Author: Lvhz
 * @Date: 2021-04-14 10:20:23
 * @Description: Description
 */
import echarts from 'echarts';
// import { getHeightRate } from '@/common/js/util.js';

const nameList = ['标准最低室内温度', '实时平均室温'];

// const dataList = [
//   { date: '11时', realNum: '21', needNum: '18' },
//   { date: '12时', realNum: '19', needNum: '18' },
//   { date: '13时', realNum: '22', needNum: '18' },
//   { date: '14时', realNum: '25', needNum: '12' },
//   { date: '15时', realNum: '21', needNum: '20' },
//   { date: '16时', realNum: '21', needNum: '20' },
//   { date: '17时', realNum: '13', needNum: '18' },
//   { date: '18时', realNum: '17', needNum: '14' },
//   { date: '19时', realNum: '15', needNum: '16' },
//   { date: '20时', realNum: '14', needNum: '20' }
// ];
// const xAxisList = dataList.map(item => item.date);
// const realNumList = dataList.map(item => item.realNum);
// const needNumList = dataList.map(item => item.needNum);

const getDataList = dataList => {
  let xAxisList = [], realNumList = [], needNumList = [];
  if (!dataList || !Array.isArray(dataList)) return { xAxisList, realNumList, needNumList };
  xAxisList = dataList.map(item => item.date || 0);
  realNumList = dataList.map(item => item.realNum || 0);
  needNumList = dataList.map(item => item.needNum || 0);
  return { xAxisList, realNumList, needNumList };

};

export const getOption = dataList => {
  const { xAxisList, realNumList, needNumList } = getDataList(dataList);
  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        lineStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0,
              color: 'rgba(0, 255, 233,0)'
            }, {
              offset: 0.5,
              color: 'rgba(255, 255, 255,1)'
            }, {
              offset: 1,
              color: 'rgba(0, 255, 233,0)'
            }],
            global: false
          }
        }
      }
    },
    legend: {
      icon: 'rect',
      itemHeight: 2,
      itemWidth: 16,
      bottom: '0%',
      left: 'center',
      textStyle: {
        fontSize: 12,
        color: 'rgba(255,255,255,0.8)'
      }
    },
    grid: {
      top: '10%',
      left: '15%',
      right: '7%',
      bottom: '30%',
      borderWidth: 1
    },
    xAxis: [{
      show: true,
      type: 'category',
      axisLine: {
        show: true
      },
      splitArea: {
        // show: true,
        color: '#BBBBBB',
        lineStyle: {
          color: '#BBBBBB'
        }
      },
      axisLabel: {
        color: '#BBBBBB',
        fontSize: 12
      },
      splitLine: {
        show: false
      },
      boundaryGap: true,
      data: xAxisList

    }],
    yAxis: [{
      type: 'value',
      min: 0,
      // max: 140,
      splitNumber: 4,
      splitLine: {
        show: true,
        lineStyle: {
          color: 'rgba(255,255,255,0.1)'
        }
      },
      axisLine: {
        show: true
      },
      axisLabel: {
        show: true,
        textStyle: {
          color: '#BBBBBB',
          fontSize: 12
        }
      },
      axisTick: {
        show: false
      }
    }],
    series: [{
      name: nameList[0],
      type: 'line',
      smooth: false, //是否平滑
      showAllSymbol: false,
      symbol: 'circle',
      symbolSize: 2,
      lineStyle: {
        normal: {
          color: '#00b3f4'
        }
      },
      itemStyle: {
        color: '#00b3f4'
      },
      areaStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: 'rgba(0,179,244,0.3)'
          },
          {
            offset: 1,
            color: 'rgba(0,179,244,0)'
          }
          ], false),
          shadowColor: 'rgba(0,179,244, 0.9)',
          shadowBlur: 20
        }
      },
      data: needNumList
    },
    {
      name: nameList[1],
      type: 'line',
      smooth: false, //是否平滑
      showAllSymbol: false,
      symbol: 'circle',
      symbolSize: 2,
      lineStyle: {
        normal: {
          color: '#FDAD43'
        }
      },
      itemStyle: {
        color: '#FDAD43'
      },
      areaStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgba(253,173,67, 0.3)'
            },
            {
              offset: 1,
              color: 'rgba(253,173,67, 0)'
            }
          ], false),
          shadowColor: 'rgba(253,173,67, 0.9)',
          shadowBlur: 20
        }
      },
      data: realNumList
    }
    ]
  };
};
