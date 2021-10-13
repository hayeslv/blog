/*
 * @Author: Lvhz
 * @Date: 2021-01-21 11:12:44
 * @Description: Description
 */
import * as echarts from 'echarts';
// import { getHeightRate } from '@/common/js/util.js';

const nameList = ['分类社区数', '小区总数'];
type ChartDataList = {
  name: string,
  number: number,
  totalNum: number
}


const getDataList = (dataList: Array<ChartDataList>) => {
  let seriesDataList1 = []; let seriesDataList2 = []; let xAxisList = [];

  seriesDataList1 = dataList.map((item) => item.number);
  seriesDataList2 = dataList.map((item) => item.totalNum);
  xAxisList = dataList.map((item) => item.name);
  return { seriesDataList1, seriesDataList2, xAxisList };
};

export function getOption(dataList: Array<ChartDataList>) {
  const { seriesDataList1, seriesDataList2, xAxisList } = getDataList(dataList);
  return {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'item',
    },
    grid: {
      top: '5%',
      left: '12%',
      bottom: '25%',
      right: '5%',
    },
    xAxis: {
      data: xAxisList,
      show: true,
      axisTick: {
        show: false,
      },
      axisLine: {
        show: true,
        lineStyle: {
          type: 'solid',
          color: 'gray',
          opacity: 1,
        },
      },
      axisLabel: {
        interval: 0,
        rotate: -40,
        textStyle: {
          color: '#fff',
          fontSize: 10,
        },
        margin: 10, // 刻度标签与轴线之间的距离。
        padding: [0, 0, 0, 0],
      },

    },
    yAxis: {
      name: '数量',
      nameTextStyle: {
        color: 'white',
        fontSize: 12,
        align: 'right',
        lineHeight: 46,
      },
      splitLine: {
        show: true,
        lineStyle: {
          type: 'dashed',
          opacity: 0.15,
        },
      },
      axisTick: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      axisLabel: {
        textStyle: {
          color: '#fff',
          fontSize: 12,
        },
      },
    },
    series: [
      // 下半截柱状图
      {
        name: nameList[0],
        type: 'bar',
        barWidth: 18,
        barGap: '-100%',
        itemStyle: { // lenged文本
          opacity: 0.7,
          color() {
            return new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: '#00D2FF', // 0% 处的颜色
            }, {
              offset: 1,
              color: '#0067FF', // 100% 处的颜色
            }], false);
          },
        },
        data: seriesDataList1,
      },
      {
        name: nameList[1],
        type: 'bar',
        barWidth: 18,
        barGap: '-100%',
        z: 0,
        itemStyle: { // lenged文本
          opacity: 0.7,
          color() {
            return new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: '#31DA64', // 0% 处的颜色
            }, {
              offset: 1,
              color: '#5BE293', // 100% 处的颜色
            }], false);
          },
        },
        data: seriesDataList2,
      },
    ],
  };
}
