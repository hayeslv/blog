/*
 * @Author: Lvhz
 * @Date: 2021-04-14 10:20:23
 * @Description: Description
 */
// import { getHeightRate } from '@/common/js/util.js';

const colorList = ['#009DFF', '#7F58FF', '#FF4F5C', '#FDAD43', '#11C372'];

type ChartDataList = {
  name: string,
  value: number
}

const getDataList = (dataList: Array<ChartDataList>) => {
  let seriesData: Array<ChartDataList> = [], legendData: Array<string> = [];
  if (!dataList || !Array.isArray(dataList)) return { seriesData, legendData };
  seriesData = dataList;
  legendData = dataList.map(item => item.name);
  return { seriesData, legendData };
};

export const getOption = (dataList: Array<ChartDataList>) => {
  const { seriesData, legendData } = getDataList(dataList);
  const totalNumber = 999;
  return {
    backgroundColor: 'transparent',
    title: {
      text: totalNumber,
      subtext: '总数(件)',
      textStyle: {
        color: '#fff',
        align: 'center',
        fontSize: 20,
        lineHeight: 10
      },
      subtextStyle: {
        color: 'rgba(255,255,255,0.6)',
        align: 'center',
        fontSize: 14,
        padding: [0, 0, 0, 0]
      },
      x: '29%',
      y: '38%',
      textAlign: 'center'
    },
    tooltip: {
      // show: false,
      trigger: 'item',
      borderColor: 'rgba(255,255,255,.3)',
      backgroundColor: 'rgba(13,5,30,.6)',
      borderWidth: 1,
      padding: 5,
      formatter: function(parms: any) {
        const str = parms.marker + '' + parms.data.name + '</br>' +
                '数量：' + parms.data.value + '件</br>' +
                '占比：' + parms.percent + '%';
        return str;
      }
    },
    legend: {
      type: 'scroll',
      orient: 'vertical',
      left: '55%',
      align: 'left',
      top: 'middle',
      icon: 'circle',
      formatter: function(name: any) {
        const item = seriesData.filter(item => item.name === name)[0];
        return `{name|${item.name}}{value|${item.value}}`;
      },
      textStyle: {
        color: '#fff',
        rich: {
          name: {
            width: 110,
            fontSize: 16
          },
          value: {
            width: 100,
            fontSize: 16
          }
        }
      },
      data: legendData
    },
    series: [{
      type: 'pie',
      z: 3,
      center: ['30%', '50%'],
      radius: ['60%', '75%'],
      clockwise: true,
      avoidLabelOverlap: true,
      hoverOffset: 4,
      itemStyle: {
        normal: {
          color: function(params: any) {
            return colorList[params.dataIndex];
          }
        }
      },
      labelLine: {
        show: false
      },
      label: {
        show: false,
        position: 'outside',
        formatter: '{a|{b}：{d}%}\n{hr|}',
        rich: {
          hr: {
            backgroundColor: 't',
            borderRadius: 3,
            width: 3,
            height: 3,
            padding: [3, 3, 0, -12]
          },
          a: {
            padding: [-30, 15, -20, 15]
          }
        }
      },
      data: seriesData
    }]
  };
};
