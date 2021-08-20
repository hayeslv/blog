/*
 * @Author: Lvhz
 * @Date: 2021-04-14 10:20:23
 * @Description: Description
 */
import echarts from 'echarts';
// import { getHeightRate } from '@/common/js/util.js';

const colorList = ['#3196FA', '#11C372', '#FACC14'];
const nameList = ['上报数（件）', '立案数（件）', '结案数（件）'];

// const dataList = [
//   { time: 0, sbNum: 100, laNum: 50, jaNum: 233 },
//   { time: 1, sbNum: 138, laNum: 50, jaNum: 10 },
//   { time: 2, sbNum: 350, laNum: 60, jaNum: 20 },
//   { time: 3, sbNum: 173, laNum: 70, jaNum: 12 },
//   { time: 4, sbNum: 180, laNum: 80, jaNum: 13 },
//   { time: 5, sbNum: 150, laNum: 90, jaNum: 50 },
//   { time: 6, sbNum: 178, laNum: 30, jaNum: 70 },
//   { time: 7, sbNum: 100, laNum: 40, jaNum: 50 },
//   { time: 8, sbNum: 138, laNum: 50, jaNum: 40 },
//   { time: 9, sbNum: 350, laNum: 60, jaNum: 60 },
//   { time: 10, sbNum: 180, laNum: 60, jaNum: 100 },
//   { time: 11, sbNum: 233, laNum: 70, jaNum: 200 },
// ]

// const xAxisDataList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
// const yAxisData1 = [100, 138, 350, 173, 180, 150, 178, 100, 138, 350, 173, 180, 233, 201, 182, 198, 234, 210, 230, 233, 201, 182, 198, 234];
// const yAxisData2 = [50, 60, 90, 80, 60, 50, 70, 50, 60, 90, 80, 60, 300, 138, 350, 173, 180, 150, 178, 100, 138, 350, 173, 180];
// const yAxisData3 = [233, 201, 182, 198, 234, 210, 230, 233, 201, 182, 198, 234, 50, 60, 90, 80, 60, 50, 70, 50, 60, 90, 80, 60];

// hex转换成rgba
const hexToRgba = (hex, opacity) => {
  let rgbaColor = '';
  const reg = /^#[\da-f]{6}$/i;
  if (reg.test(hex)) {
    rgbaColor = `rgba(${parseInt('0x' + hex.slice(1, 3))},${parseInt('0x' + hex.slice(3, 5))},${parseInt('0x' + hex.slice(5, 7))},${opacity})`;
  }
  return rgbaColor;
};

const areaStyle = (index) => {
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

const getDataList = dataList => {
  let xAxisDataList = [], yAxisData1 = [], yAxisData2 = [], yAxisData3 = [];
  if (!dataList || !Array.isArray(dataList)) return { xAxisDataList, yAxisData1, yAxisData2, yAxisData3 };
  xAxisDataList = dataList.map(item => item.time);
  yAxisData1 = dataList.map(item => item.sbNum || 0);
  yAxisData2 = dataList.map(item => item.laNum || 0);
  yAxisData3 = dataList.map(item => item.jaNum || 0);
  return { xAxisDataList, yAxisData1, yAxisData2, yAxisData3 };
};

export const getOption = dataList => {
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
      formatter: function(params) {
        let html = '';
        html += `
          <div style="font-size: 12px;">${params[0].name || 0}时</div>
        `;
        params.forEach(v => {
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
          fontSize: 16
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
          fontSize: 16
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