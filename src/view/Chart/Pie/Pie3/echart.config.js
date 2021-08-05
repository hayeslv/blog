/*
 * @Author: Lvhz
 * @Date: 2021-04-14 10:20:23
 * @Description: Description
 */

var colorList = ['#7F58FF', '#FF4F5C', '#FDAD43', '#11C372', '#009DFF'];

// const dataList = [
//   { name: '白天亮灯', value: 6543, rate: '35%' }, 
//   { name: '最多字段数2', value: 7543, rate: '25%' }, 
//   { name: '最多字段数3', value: 7543, rate: '25%' }, 
//   { name: '最多字段数5', value: 7543, rate: '25%' }, 
//   { name: '最多字段数4', value: 4543, rate: '20%' }
// ];

const getDataList = dataList => {
  let seriesData = [], legendData = [];
  if (!dataList || !Array.isArray(dataList)) return { seriesData, legendData };
  seriesData = dataList;
  legendData = dataList.map(item => item.name || '');
  return { seriesData, legendData };
};

export const getOption = dataList => {
  const { seriesData, legendData } = getDataList(dataList);
  return {
    backgroundColor: 'transparent',
    tooltip: {
      // show: false,
      trigger: 'item',
      borderColor: 'rgba(255,255,255,.3)',
      backgroundColor: 'rgba(13,5,30,.6)',
      borderWidth: 1,
      padding: 5,
      formatter: function(parms) {
        var str = parms.marker + '' + parms.data.name + '</br>' +
                '数量：' + parms.data.value + '件</br>' +
                '占比：' + parms.percent + '%';
        return str;
      }
    },
    legend: {
      type: 'scroll',
      orient: 'vertical',
      left: '50%',
      align: 'left',
      top: 'middle',
      icon: 'circle',
      formatter: function(name) {
        const item = seriesData.filter(item => item.name === name)[0];
        return `{name|${item.name}}{value|${item.rate}}`;
      },
      textStyle: {
        color: '#fff',
        rich: {
          name: {
            width: 130,
            fontSize: 16,
            color: '#BBBBBB'
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
      center: ['25%', '50%'],
      // radius: ['60%', '75%'],
      clockwise: true,
      avoidLabelOverlap: true,
      hoverOffset: 4,
      itemStyle: {
        normal: {
          color: function(params) {
            return colorList[params.dataIndex];
          }
        }
      },
      labelLine: {
        show: false
      },
      label: {
        show: false
      },
      data: seriesData
    }]
  };
};
