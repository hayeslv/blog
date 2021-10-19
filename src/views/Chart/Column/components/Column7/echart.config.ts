/*
 * @Author: Lvhz
 * @Date: 2021-01-21 11:12:44
 * @Description: Description
 */
import * as echarts from 'echarts';
// import { getHeightRate } from '@/common/js/util.js';

type ChartDataList = {
  name: string,
  value: number,
}

const getDataList = (dataList: Array<ChartDataList>) => {
  let xAxisDataList: Array<string> = [], seriesDataList: Array<number> = [];

  xAxisDataList = dataList.map((item) => item.name);
  seriesDataList = dataList.map((item) => item.value);
  return { xAxisDataList, seriesDataList };
};

export function getOption(dataList: Array<ChartDataList>) {
  const { xAxisDataList, seriesDataList } = getDataList(dataList);
  return {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
        top: '15%',
        right: '3%',
        left: '10%',
        bottom: '20%'
    },
    xAxis: [{
      type: 'category',
      data: xAxisDataList,
      axisLine: {
        lineStyle: {
          color: '#FFFFFF'
        }
      },
      axisLabel: {
        margin: 10,
        color: '#e2e9ff',
        textStyle: {
          fontSize: 12
        },
      },
      axisTick: {
        show: false
      }
    }],
    yAxis: [{
      axisLabel: {
        formatter: '{value}',
        color: '#e2e9ff',
      },
      axisTick: {
        show: false
      },
      axisLine: {
        show: false,
        lineStyle: {
          color: 'rgba(0,186,255,.6)'
        }
      },
      splitLine: {
        lineStyle: {
          color: 'rgba(255,255,255,0.12)'
        }
      }
    }],
    series: [{
      type: 'bar',
      data: seriesDataList,
      barWidth: '16px',
      itemStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: 'rgba(0,244,255,1)' // 0% 处的颜色
          }, {
            offset: 1,
            color: 'rgba(0,77,167,1)' // 100% 处的颜色
        }], false),
          shadowColor: 'rgba(0,160,221,1)',
          shadowBlur: 4,
        }
      },
      label: {
        normal: {
          show: true,
          lineHeight: 5,
          formatter: '{c}',
          position: 'top',
          textStyle: {
            color: '#00D6F9',
            fontSize: 12
          }
        }
      }
  }]
};
}
