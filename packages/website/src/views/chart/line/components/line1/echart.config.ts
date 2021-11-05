/*
 * @Author: Lvhz
 * @Date: 2021-04-14 10:20:23
 * @Description: Description
 */
import * as echarts from 'echarts';
// import { getHeightRate } from '@/common/js/util.js';

const colorList = ['#3196FA', '#11C372', '#FACC14'];
const nameList = ['上报数（件）', '立案数（件）', '结案数（件）'];

type ChartDataList = {
  name: number,
  value1: number,
  value2: number,
  value3: number,
}

// hex转换成rgba
const hexToRgba = (hex: string, opacity: number) => {
  let rgbaColor = '';
  const reg = /^#[\da-f]{6}$/i;
  if (reg.test(hex)) {
    rgbaColor = `rgba(${parseInt('0x' + hex.slice(1, 3))},${parseInt('0x' + hex.slice(3, 5))},${parseInt('0x' + hex.slice(5, 7))},${opacity})`;
  }
  return rgbaColor;
};

const areaStyle = (index: number) => {
  return {
    normal: {
      color: new echarts.graphic.LinearGradient(0, 0, 0, 1,
        [{
          offset: 0,
          color: hexToRgba(colorList[index], 0.2)
        }, {
          offset: 1,
          color: hexToRgba(colorList[index], 0)
        }]
      ),
      shadowColor: hexToRgba(colorList[index], 0.1),
      shadowBlur: 10
    }
  };
};

const getDataList = (dataList: Array<ChartDataList>) => {
  let xAxisDataList: Array<number> = [], yAxisData1: Array<number> = [], yAxisData2: Array<number> = [], yAxisData3: Array<number> = [];
  xAxisDataList = dataList.map(item => item.name);
  yAxisData1 = dataList.map(item => item.value1 || 0);
  yAxisData2 = dataList.map(item => item.value2 || 0);
  yAxisData3 = dataList.map(item => item.value3 || 0);
  return { xAxisDataList, yAxisData1, yAxisData2, yAxisData3 };
};

export const getOption = (dataList: Array<ChartDataList>) => {
  const { xAxisDataList, yAxisData1, yAxisData2, yAxisData3 } = getDataList(dataList);
  return {
    backgroundColor: 'transparent',
    color: colorList,
    grid: {
      top: '10%',
      left: '15%',
      right: '5%',
      bottom: '35%'
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
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'line'
      },
      extraCssText: `font-size:14px;line-height:24px;color:rgba(255,255,255,0.65);background:rgba(0,0,0,0.6);box-shadow:0 0 3px rgba(0, 0, 0, 0.2)`,
      formatter: function(params: any) {
        let html = '';
        html += `
          <div style="font-size: 12px;">${params[0].name || 0}时</div>
        `;
        params.forEach((v: any) => {
          html += `
          <div style="display:flex; justify-content: space-between;">
            <div style="display:flex; align-items: center;">
              <span style="display:inline-block;
                margin-right: 6px;
                width: 10px;
                min-width: 10px;
                height: 2px;
                min-height: 2px;
                background-color:${colorList[v.componentIndex]};"
              ></span>
              <span>${v.seriesName}</span>
            </div>
            <span style="font-size: 12px;">${v.value}</span>
          </div>
          `;
        });
        return html;
      }
    },
    xAxis: {
      data: xAxisDataList,
      axisLabel: {
        textStyle: {
          color: 'rgba(255,255,255,0.65)',
          fontSize: 12
        },
        // interval: 0, // x轴间距
        formatter: '{value}时'
      },
      axisLine: { // 横坐标轴
        lineStyle: {
          color: 'rgba(255,255,255,0.3)'
        }
      },
      axisTick: { // 横坐标轴上的脚标（竖线）
        show: false
      }
    },
    yAxis: {
      axisLabel: {
        textStyle: {
          color: 'rgba(255,255,255,0.65)',
          fontSize: 12
        }
      },
      axisLine: { // 竖坐标轴
        show: false
      },
      splitLine: { // 竖坐标出来的线
        show: true,
        lineStyle: {
          color: 'rgba(255,255,255,0.15)',
          type: 'dotted'
        }
      },
      minInterval: 1 // y轴的最小间隔为1
    },
    series: [{
      name: nameList[0],
      type: 'line',
      data: yAxisData1,
      smooth: true,
      symbolSize: 2,
      showSymbol: false,
      areaStyle: areaStyle(0)
    }, {
      name: nameList[1],
      type: 'line',
      data: yAxisData2,
      smooth: true,
      symbolSize: 2,
      showSymbol: false,
      areaStyle: areaStyle(1)
    }, {
      name: nameList[2],
      type: 'line',
      data: yAxisData3,
      smooth: true,
      symbolSize: 2,
      showSymbol: false,
      areaStyle: areaStyle(2)
    }]
  };
};
