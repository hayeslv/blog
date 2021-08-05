/*
 * @Author: Lvhz
 * @Date: 2021-04-14 10:20:23
 * @Description: Description
 */

// const dataList = [
//   { 'id': 1, 'temp': '25', 'date': '00时', 'standardNum': 200, 'noStandardNum': 155 },
//   { 'id': 2, 'temp': '22', 'date': '01时', 'standardNum': 155, 'noStandardNum': 200 },
//   { 'id': 3, 'temp': '26', 'date': '02时', 'standardNum': 352, 'noStandardNum': 3 },
//   { 'id': 4, 'temp': '23', 'date': '03时', 'standardNum': 200, 'noStandardNum': 155 },
//   { 'id': 5, 'temp': '20', 'date': '04时', 'standardNum': 352, 'noStandardNum': 3 },
//   { 'id': 6, 'temp': '21', 'date': '05时', 'standardNum': 355, 'noStandardNum': 0 },
//   { 'id': 7, 'temp': '25', 'date': '06时', 'standardNum': 300, 'noStandardNum': 55 },
//   { 'id': 8, 'temp': '22', 'date': '07时', 'standardNum': 352, 'noStandardNum': 3 },
//   { 'id': 9, 'temp': '26', 'date': '08时', 'standardNum': 354, 'noStandardNum': 1 },
//   { 'id': 10, 'temp': '23', 'date': '09时', 'standardNum': 352, 'noStandardNum': 3 },
//   { 'id': 11, 'temp': '20', 'date': '10时', 'standardNum': 355, 'noStandardNum': 40 },
//   { 'id': 12, 'temp': '21', 'date': '11时', 'standardNum': 355, 'noStandardNum': 40 },
//   { 'id': 13, 'temp': '25', 'date': '12时', 'standardNum': 350, 'noStandardNum': 5 },
//   { 'id': 14, 'temp': '22', 'date': '13时', 'standardNum': 352, 'noStandardNum': 3 },
//   { 'id': 15, 'temp': '26', 'date': '14时', 'standardNum': 354, 'noStandardNum': 1 },
//   { 'id': 16, 'temp': '23', 'date': '15时', 'standardNum': 352, 'noStandardNum': 3 },
//   { 'id': 17, 'temp': '25', 'date': '16时', 'standardNum': 355, 'noStandardNum': 50 },
//   { 'id': 18, 'temp': '22', 'date': '17时', 'standardNum': 355, 'noStandardNum': 50 },
//   { 'id': 19, 'temp': '26', 'date': '18时', 'standardNum': 355, 'noStandardNum': 50 },
//   { 'id': 20, 'temp': '23', 'date': '19时', 'standardNum': 355, 'noStandardNum': 0 },
//   { 'id': 21, 'temp': '20', 'date': '20时', 'standardNum': 350, 'noStandardNum': 5 },
//   { 'id': 22, 'temp': '21', 'date': '21时', 'standardNum': 352, 'noStandardNum': 3 },
//   { 'id': 23, 'temp': '25', 'date': '22时', 'standardNum': 354, 'noStandardNum': 1 },
//   { 'id': 24, 'temp': '25', 'date': '23时', 'standardNum': 352, 'noStandardNum': 3 }
// ];

// const xAxisList = dataList.map(item => item.date);
// const tempList = dataList.map(item => item.temp);
// const standardNumList = dataList.map(item => item.standardNum);
// const noStandardNumList = dataList.map(item => item.noStandardNum);

const getDataList = dataList => {
  let xAxisList = [], tempList = [], standardNumList = [], noStandardNumList = [];
  if (!dataList || !Array.isArray(dataList)) return { xAxisList, tempList, standardNumList, noStandardNumList };
  xAxisList = dataList.map(item => item.date);
  tempList = dataList.map(item => item.temp);
  standardNumList = dataList.map(item => item.standardNum || 0);
  noStandardNumList = dataList.map(item => item.noStandardNum || 0);
  return { xAxisList, tempList, standardNumList, noStandardNumList };
};

export const getOption = dataList => {
  const { xAxisList, tempList, standardNumList, noStandardNumList } = getDataList(dataList);
  return {
    tooltip: {
      trigger: 'axis',
      formatter: function(params, ticket, callback) {

        var res = params[0].name;

        for (var i = 0, l = params.length; i < l; i++) {
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
      data: tempList
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
      data: standardNumList
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
      data: noStandardNumList
    }]
  };
};
