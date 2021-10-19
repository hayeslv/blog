
/*
 * @Author: Lvhz
 * @Date: 2021-01-21 11:12:44
 * @Description: Description
 */
// import { getHeightRate } from '@/common/js/util.js';

const colorList = ['#37a2da','#32c5e9','#9fe6b8','#ffdb5c','#ff9f7f','#fb7293','#e7bcf3','#8378ea']

const handred = 100
const point = 66

const nameList = ['问题上报处置数', '问题上报数' ];
type ChartDataList = {
  name: string,
  number: number,
  totalNum: number
}

// 内圈小点点
const _pie2 = () => {
  const dataArr = [];
  for (let i = 0; i < 100; i++) {
    if (i % 2 === 0) {
      dataArr.push({
        name: (i + 1).toString(),
        value: 1,
        itemStyle: {
          normal: {
            color: '#bbb',
            borderWidth: 0,
            borderColor: '#bbb'
          }
        }
      });
    } else {
      dataArr.push({
        name: (i + 1).toString(),
        value: 5,
        itemStyle: {
          normal: {
            color: 'rgba(0,0,0,0)',
            borderWidth: 0,
            borderColor: 'rgba(0,0,0,0)'
          }
        }
      });
    }

  }
  return dataArr;
};


const getDataList = (dataList: Array<ChartDataList>) => {
  let seriesDataList1 = []; let seriesDataList2 = []; let xAxisList = [];

  seriesDataList1 = dataList.map((item) => item.number);
  seriesDataList2 = dataList.map((item) => item.totalNum);
  xAxisList = dataList.map((item) => item.name);
  return { seriesDataList1, seriesDataList2, xAxisList };
};

export function getOption(dataList: Array<ChartDataList>) {
  const { seriesDataList1, seriesDataList2, xAxisList } = getDataList(dataList);
  const legendData = []
  for (let j = 0; j < dataList.length; j++) {
    const data = {
      name: dataList[j].name,
      icon: 'circle',
      textStyle: {
        fontSize: 18,
        color: colorList[j]
      }
    }
    legendData.push(data)
  }
  return {
    title: {
      text: point + '%',
      x: 'center',
      y: 'center',
      textStyle: {
        fontWeight: 'normal',
        color: '#29EEF3',
        fontSize: '20'
      }
    },
    tooltip: {
      formatter: function(params : any) {
         return params.name + '：' + params.percent + ' %'
      }
    },
    legend: {
      show: true,
      itemGap: 12,
      data: ['占比', '剩余'],
      textStyle: {
        fontWeight: 'normal',
        color: '#fff',
        fontSize: '12'
      }
    },
    series: [{
      name: 'circle',
      type: 'pie',
      clockWise: true,
      center: ['50%', '50%'],
      radius: ['55%', '70%'],
      itemStyle: {
        normal: {
          label: {
            show: false
          },
          labelLine: {
            show: false
          }
        }
      },
      hoverAnimation: false,
      data: [{
        value: point,
        name: '占比',
        itemStyle: {
          normal: {
            color: { // 颜色渐变
              colorStops: [{
                offset: 0,
                color: '#4FADFD' // 0% 处的颜色
              }, {
                offset: 1,
                color: '#28E8FA' // 100% 处的颜色1
              }]
            },
            label: {
              show: false
            },
            labelLine: {
              show: false
            }
          }
        }
      }, {
        name: '剩余',
        value: handred - point,
        itemStyle: {
          normal: {
            color: '#E1E8EE'
          }
        }
      }]
    }, {
      type: 'pie',
      zlevel: 3,
      silent: true,
      center: ['50%', '50%'],
      radius: ['46%', '50%'],
      label: {
        normal: {
          show: false
        }
      },
      labelLine: {
        show: false
      },
      data: _pie2()
    }]
  }
}
