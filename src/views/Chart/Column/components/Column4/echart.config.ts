/*
 * @Author: Lvhz
 * @Date: 2021-01-21 11:12:44
 * @Description: Description
 */
import * as echarts from 'echarts';
// import { getHeightRate } from '@/common/js/util.js';

const nameList = ['注册资金', '税收'];
type ChartDataList = {
  name: string,
  value1: number,
  value2: number
}

const colorList = ['rgba(35,195,255,1)', 'rgba(254,215,46,1)']

const getDataList = (dataList: Array<ChartDataList>) => {
  let yAxisDataList: Array<string> = [], valueList1: Array<number> = [], valueList2: Array<number> = []
  yAxisDataList = dataList.map(item => item.name);
  valueList1 = dataList.map(item => item.value1);
  valueList2 = dataList.map(item => item.value2);
  return { yAxisDataList, valueList1, valueList2 };
};

export function getOption(dataList: Array<ChartDataList>) {
  const { yAxisDataList, valueList1, valueList2 } = getDataList(dataList);
  return {
    backgroundColor: "transparent",
    grid: {
      top: '8%',
      right: '5%',
      left: '60',
      bottom: '32%' //图表尺寸大小
    },
    legend: {
      data: nameList,
      itemGap: 10,
      icon: 'none',
      bottom: '0%',
      left: 'center',
      itemHeight: 10,
      itemWidth: 20,
      formatter: function(value: any) {
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
    tooltip: {
      trigger: "axis",
      fontSize: 14,
      formatter: function(val: any) {
        return `<span style="color:#23C3FF;margin-right:5px;">●</span>${val[0].axisValue}<br/>主体数量 : <span style="color:#23C3FF">${dataList[val[0]['dataIndex']].value1}</span><br/>注册资金 : <span style="color:#23C3FF">${dataList[val[0]['dataIndex']].value2}亿</span>`
      }
    },
    xAxis: {
			type: 'category',
			color: '#59588D',
			data: yAxisDataList,
			axisLabel: {
				margin: 6,
				color: '#EEEEEE',
				textStyle: {
					fontSize: 14
				},
			},
			axisLine: {
				lineStyle: {
					color: '#477AA5',
				}
			},
			axisTick: {
				show: false
			},
			splitLine: {
				show: false,
			},
    },
    yAxis: [
			{
				// min: 0,
				// max: 120,
				splitNumber : 3, // y轴分隔数
				axisLabel: {
					formatter: '{value}亿',
					color: '#EEEEEE',
					textStyle: {
						fontSize: 12
					},
				},
				axisLine: {
					lineStyle: {
						color: '#477AA5',
						type: 'dashed'
					}
				},
				axisTick: {
					show: false
				},
				splitLine: {
					show: false,
				}
			}
    ],
    series: [{
			type: 'bar',
			name: nameList[0],
			data: valueList1,
			barWidth: '16',
			itemStyle: {
				normal: {
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
							offset: 0,
							color: colorList[0],
						},
						{
							offset: 1,
							color: 'rgba(35,195,255,0)',
						},
					]),
				},
			},
			label: {
				normal: {
					show: false,
					fontSize: 16,
					fontWeight: 'bold',
					color: '#333',
					position: 'top',
				}
			}
		},
		{
			type: 'bar',
			name: nameList[1],
			data: valueList2,
			barWidth: '16',
			itemStyle: {
				normal: {
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
							offset: 0,
							color: colorList[1],
						},
						{
							offset: 1,
							color: "rgba(254,215,46,0)",
						},
					]),
				},
			},
			label: {
				normal: {
					show: false,
					fontSize: 16,
					fontWeight: 'bold',
					color: '#333',
					position: 'top',
				}
			}
		}]
	};
}
