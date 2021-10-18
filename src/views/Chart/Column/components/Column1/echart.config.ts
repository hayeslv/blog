/*
 * @Author: Lvhz
 * @Date: 2021-01-21 11:12:44
 * @Description: Description
 */
import * as echarts from 'echarts';
// import { getHeightRate } from '@/common/js/util.js';

type ChartDataList = {
  name: string,
  value: number
}

const colorList = ['rgba(0, 103, 255 ,0)', 'rgba(0, 210, 255, 1)']

const getDataList = (dataList: Array<ChartDataList>) => {
  let yAxisDataList: Array<string> = [];
  let valueList: Array<number> = [];
  if (!dataList || !Array.isArray(dataList)) return { yAxisDataList, valueList };
  yAxisDataList = dataList.map(item => item.name);
  valueList = dataList.map(item => item.value);
  return { yAxisDataList, valueList };
};

export function getOption(dataList: Array<ChartDataList>) {
  const { yAxisDataList, valueList } = getDataList(dataList);
  return {
    backgroundColor: 'transparent',
    grid: {
      left: '5%',
      right: '15%',
      bottom: '-10%',
      top: '0%',
      containLabel: true
    },
    tooltip: {
      show: false,
      trigger: 'axis',
      axisPointer: {
        type: 'none'
      }
    },
    xAxis: {
      show: false,
      type: 'value'
    },
    yAxis: [{
      type: 'category',
      inverse: true,
      axisLabel: {
        show: true,
        textStyle: {
          color: 'rgba(255,255,255,0.9)',
          fontSize: 12
        }
      },
      splitLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLine: {
        show: false
      },
      data: yAxisDataList
    }],
    series: [{
      type: 'pictorialBar',
      symbol: 'rect',
      itemStyle: {
        normal: {
          color: 'none'
        }
      },
      label: {
        normal: {
          formatter: (params: any) => {
            return '{f|' + params.data + '}';
          },
          rich: {
            f: {
              color: 'rgba(255,255,255,0.9)',
              fontSize: 12,
              padding: [0, 0, 0, -2]
            }
          },
          position: 'right',
          show: true
        }
      },
      z: 0,
      animationEasing: 'elasticOut',
      data: valueList
    }, {
      type: 'bar',
      zlevel: 1,
      itemStyle: {
        normal: {
          barBorderRadius: 10,
          color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
            offset: 0,
            color: colorList[0]
          }, {
            offset: 1,
            color: colorList[1]
          }])
        }
      },
      barWidth: 8,
      data: valueList
    }]
  };
}
