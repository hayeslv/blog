/*
 * @Author: Lvhz
 * @Date: 2021-04-14 10:20:23
 * @Description: Description
 */

type ChartDataList = {
  name: string,
  lineVal: number,
  colVal1: number,
  colVal2: number
}

const getDataList = (dataList: Array<ChartDataList>) => {
  let xAxisList = [], lineValList = [], colVal1List = [], colVal2List = [];
  xAxisList = dataList.map(item => item.name);
  lineValList = dataList.map(item => item.lineVal || 0);
  colVal1List = dataList.map(item => item.colVal1 || 0);
  colVal2List = dataList.map(item => item.colVal2 || 0);
  return { xAxisList, lineValList, colVal1List, colVal2List };
};

export const getOption = (dataList: Array<ChartDataList>) => {
  const { xAxisList, lineValList, colVal1List, colVal2List } = getDataList(dataList);
  return {
    tooltip: {
      trigger: 'axis',
      formatter: function(params: any, ticket: any, callback: any) {
        let res = params[0].name;

        for (let i = 0, l = params.length; i < l; i++) {
          if (params[i].seriesType === 'line') {
            res += '<br/>' + params[i].seriesName + ' : ' + (params[i].value ? params[i].value : '-') + '℃';
          } else {
            res += '<br/>' + params[i].seriesName + ' : ' + (params[i].value ? params[i].value : '-') + '个';
          }
        }
        return res;

      }
    },
    grid: {
      containLabel: true,
      top: '20%', //距上边距
      left: '5%', //距离左边距
      right: '5%', //距离右边距
      bottom: '5%' //距离下边距
    },
    legend: {
      icon: 'rect',
      itemHeight: 4,
      itemWidth: 16,
      data: ['达标数', '不达标数', '平均温度'],
      textStyle: {
        lineHeight: 45,
        fontSize: 12,
        color: '#BBBBBB'
      }
    },
    xAxis: [{
      type: 'category',
      axisTick: {
        alignWithLabel: false
      },
      axisLine: {
        lineStyle: {
          color: '#BBBBBB',
          fontSize: 12
        }
      },
      axisLabel: {
        fontSize: 12,
        interval: 2
      },
      data: xAxisList
    }],
    yAxis: [{
      type: 'value',
      name: '(℃)',
      nameTextStyle: {
        fontSize: 12,
        padding: [0, 0, 0, 15],
        align: 'left'
      },
      axisLine: {
        show: false,
        lineStyle: {
          color: '#BBBBBB',
          fontSize: 12
        }
      },
      axisTick: {
        show: false
      },
      splitLine: {
        show: false
      },
      min: 0,
      position: 'right',
      axisLabel: {
        formatter: '{value}',
        textStyle: {
          color: '#BBBBBB',
          fontSize: 12
        }
      }
    }, {
      type: 'value',
      name: '(个)',
      nameTextStyle: {
        fontSize: 12,
        padding: [0, 15, 0, 0],
        align: 'right'
      },
      axisLine: {
        show: false,
        lineStyle: {
          color: '#BBBBBB',
          fontSize: 12
        }
      },
      axisTick: {
        show: false
      },
      min: 0,
      splitLine: {
        show: false
      },
      position: 'left',
      axisLabel: {
        formatter: '{value}',
        textStyle: {
          color: '#BBBBBB',
          fontSize: 12
        }
      }
    }],
    series: [{
      name: '平均温度',
      type: 'line',
      color: '#11C372',
      smooth: true,
      label: {
        normal: {
          show: false,
          position: 'top'
        }
      },
      lineStyle: {
        normal: {
          width: 3,
          shadowColor: 'rgba(0,0,0,0.4)',
          shadowBlur: 10,
          shadowOffsetY: 10
        }
      },
      data: lineValList
    }, {
      name: '达标数',
      type: 'bar',
      color: '#009DFF',
      yAxisIndex: 1,
      label: {
        normal: {
          show: false,
          position: 'top'
        }
      },
      data: colVal1List
    }, {
      name: '不达标数',
      type: 'bar',
      color: '#FF4F5C',
      yAxisIndex: 1,
      label: {
        normal: {
          show: false,
          position: 'top'
        }
      },
      data: colVal2List
    }]
  };
};
