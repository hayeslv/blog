/*
 * @Author: Lvhz
 * @Date: 2021-01-21 11:12:44
 * @Description: Description
 */
import * as echarts from 'echarts';
// import { getHeightRate } from '@/common/js/util.js';

const nameList = ['厨余垃圾', '有害垃圾', '可回收垃圾', '其它垃圾'];
const colorList = ['#00D2FF', '#EF4864', '#31DA64', '#FACC14'];

type ChartDataList = {
  name: string,
  value1: number,
  value2: number,
  value3: number,
  value4: number,
}


const getDataList = (dataList: Array<ChartDataList>) => {
  let yAxisDataList: Array<string> = [], valueList1 = [], valueList2 = [], valueList3 = [], valueList4 = [];

  yAxisDataList = dataList.map((item) => item.name);
  valueList1 = dataList.map((item) => item.value1);
  valueList2 = dataList.map((item) => item.value2);
  valueList3 = dataList.map((item) => item.value3);
  valueList4 = dataList.map((item) => item.value4);
  return { yAxisDataList, valueList1, valueList2, valueList3, valueList4  };
};

export function getOption(dataList: Array<ChartDataList>) {
  const { yAxisDataList, valueList1, valueList2, valueList3, valueList4 } = getDataList(dataList);
  return {
    backgroundColor: '#00265f',
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '15%',
      top: '15%',
      containLabel: true,
    },
    legend: {
      data: nameList,
      itemGap: 0,
      icon: 'none',
      bottom: '0%',
      left: 'center',
      itemHeight: 10,
      itemWidth: 0,
      formatter(value: any) {
        let key = 0;
        for (let i = 0; i < nameList.length; i++) {
          if (value === nameList[i]) key = i;
        }
        return `{${key}|}{word|${value}}`;
      },
      textStyle: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: 12,
        rich: { // 修复legend样式，使之不会渐变
          0: {
            width: 8,
            height: 8,
            backgroundColor: colorList[0],
          },
          1: {
            width: 8,
            height: 8,
            backgroundColor: colorList[1],
          },
          2: {
            width: 8,
            height: 8,
            backgroundColor: colorList[2],
          },
          3: {
            width: 8,
            height: 8,
            backgroundColor: colorList[3],
          },
          word: {
            color: 'rgba(255,255,255,0.8)',
            fontSize: 12,
            padding: [0, 0, 0, 6],
          },
        },
      },
    },
    xAxis: [{
      type: 'category',
      data: yAxisDataList,
      axisLine: {
        show: true,
        lineStyle: {
          color: '#063374',
          width: 1,
          type: 'solid',
        },
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        show: true,
        interval: 0, // x轴间距
        textStyle: {
          color: 'rgba(255,255,255,0.8)',
        },
      },
    }],
    yAxis: [{
      name: '(吨)',
      type: 'value',
      nameTextStyle: {
        fontSize: 12,
        color: '#fff',
        padding: [0, 0, -6, -30]
      },
      splitNumber : 3, // y轴分隔数
      axisLabel: {
        formatter: '{value}',
      },
      axisTick: {
        show: false,
      },
      axisLine: {
        show: false,
        lineStyle: {
          color: 'rgba(255,255,255,0.8)',
          width: 1,
          type: 'solid',
        },
      },
      splitLine: {
        lineStyle: {
          color: '#063374',
        },
      },
    }],
    series: [{
      name: nameList[0],
      type: 'bar',
      data: valueList1,
      barWidth: 10, // 柱子宽度
      barGap: 0, // 柱子之间间距
      itemStyle: {
        barBorderRadius: 30,
        color() {
          return new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: '#00D2FF', // 0% 处的颜色
          }, {
            offset: 1,
            color: 'rgba(0,103,255,0.00)', // 100% 处的颜色
          }], false);
        },
      },
    }, {
      name: nameList[1],
      type: 'bar',
      data: valueList2,
      barWidth: 10,
      barGap: 0,
      itemStyle: {
        barBorderRadius: 30,
        color() {
          return new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: '#ef4864', // 0% 处的颜色
          }, {
            offset: 1,
            color: 'rgba(239,72,100,0.00)', // 100% 处的颜色
          }], false);
        },
      },
    }, {
      name: nameList[2],
      type: 'bar',
      data: valueList3,
      barWidth: 10,
      barGap: 0,
      itemStyle: {
        barBorderRadius: 30,
        color() {
          return new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: '#31da64', // 0% 处的颜色
          }, {
            offset: 1,
            color: 'rgba(91,226,147,0.00)', // 100% 处的颜色
          }], false);
        },
      },
    }, {
      name: nameList[3],
      type: 'bar',
      data: valueList4,
      barWidth: 10,
      barGap: 0,
      itemStyle: {
        barBorderRadius: 30,
        color() {
          return new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: '#facc14', // 0% 处的颜色
          }, {
            offset: 1,
            color: 'rgba(250,204,20,0.00)', // 100% 处的颜色
          }], false);
        },
      },
    }],
  };
}
