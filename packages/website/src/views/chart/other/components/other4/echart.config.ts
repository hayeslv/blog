/*
 * @Author: Lvhz
 * @Date: 2021-04-14 10:20:23
 * @Description: Description
 */

import * as echarts from 'echarts';

const nameList = ['销售水量', '主营业务'];
type ChartDataList = {
  name: string,
  value1: number,
  value2: number
}

const getDataList = (dataList: Array<ChartDataList>) => {
	let xAxisDataList: Array<string> = [], yAxisData1: Array<number> = [], yAxisData2: Array<number> = [];
	xAxisDataList = dataList.map(item => item.name);
	yAxisData1 = dataList.map(item => item.value1 || 0);
  yAxisData2 = dataList.map(item => item.value2 || 0);
	return { xAxisDataList, yAxisData1, yAxisData2 }
}

export const getOption = (dataList: Array<ChartDataList>) => {
  const { xAxisDataList, yAxisData1, yAxisData2 } = getDataList(dataList);
  return {
    backgroundColor: 'transparent',
    grid: {
      left: '10%',
      top: "25%",
      bottom: "20%"
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
        label: {
          show: false
        }
      }
    },
    xAxis: {
			data: xAxisDataList,
			axisLine: {
				show: true, //隐藏X轴轴线
				lineStyle: {
					color: '#01FCE3'
				}
			},
			axisTick: {
				show: true //隐藏X轴刻度
			},
			axisLabel: {
				show: true,
				textStyle: {
					color: "#ebf8ac" //X轴文字颜色
				}
			},
    },
    yAxis: [{
			type: "value",
			name: "数量",
			nameTextStyle: {
				color: "#ebf8ac"
			},
			splitLine: {
				show: false
			},
			axisTick: {
				show: true
			},
			axisLine: {
				show: true,
				lineStyle: {
					color: '#FFFFFF'
				}
			},
			axisLabel: {
				show: true,
				textStyle: {
					color: "#ebf8ac"
				}
			},
		},
		{
			type: "value",
			name: "占比",
			nameTextStyle: {
				color: "#ebf8ac"
			},
			position: "right",
			splitLine: {
				show: false
			},
			axisTick: {
				show: false
			},
			axisLine: {
				show: false
			},
			axisLabel: {
				show: true,
				formatter: "{value} %", //右侧Y轴文字显示
				textStyle: {
					color: "#ebf8ac"
				}
			}
		},
		{
			type: "value",
			gridIndex: 0,
			// 加上后图表中间有间隔线
			// min: 50,
			// max: 100,
			splitNumber: 8,
			splitLine: {
				show: false
			},
			axisLine: {
				show: false
			},
			axisTick: {
				show: false
			},
			axisLabel: {
				show: false
			},
			splitArea: {
				show: true,
				areaStyle: {
					color: ["rgba(250,250,250,0.0)", "rgba(250,250,250,0.05)"]
				}
			}
		}],
    series: [{
			name: nameList[0],
			type: "line",
			yAxisIndex: 1, //使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用
			smooth: true, //平滑曲线显示
			showAllSymbol: true, //显示所有图形。
			symbol: "circle", //标记的图形为实心圆
			symbolSize: 10, //标记的大小
			itemStyle: {
				//折线拐点标志的样式
				color: "#058cff"
			},
			lineStyle: {
				color: "#058cff"
			},
			areaStyle:{
				color: "rgba(5,140,255, 0.2)"
			},
			data: yAxisData1
		},
		{
			name: nameList[1],
			type: "bar",
			barWidth: 15,
			itemStyle: {
				normal: {
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
							offset: 0,
							color: "#00FFE3"
						},
						{
							offset: 1,
							color: "#4693EC"
						}
					])
				}
			},
			data: yAxisData2
		}]
	};
};
