
/*
 * @Author: Lvhz
 * @Date: 2021-01-21 11:12:44
 * @Description: Description
 */
// import { getHeightRate } from '@/common/js/util.js';

const colorList = ['#009DFF', '#7F58FF', '#FF4F5C', '#FDAD43', '#11C372'];

type ChartDataList = {
  name: string,
  value: number,
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
            borderColor: '#bbb',
          },
        },
      });
    } else {
      dataArr.push({
        name: (i + 1).toString(),
        value: 5,
        itemStyle: {
          normal: {
            color: 'rgba(0,0,0,0)',
            borderWidth: 0,
            borderColor: 'rgba(0,0,0,0)',
          },
        },
      });
    }
  }
  return dataArr;
};

const getDataList = (dataList: Array<ChartDataList>) => {
  let seriesData : Array<ChartDataList> = []; let legendData : Array<string> = [];
  seriesData = dataList;
  legendData = dataList.map((item) => item.name);
  return { seriesData, legendData };
};

export function getOption(dataList: Array<ChartDataList>) {
  const { seriesData, legendData } = getDataList(dataList);
  const totalNumber = dataList.reduce((pre, cur) => pre + cur.value, 0);
  return {
    backgroundColor: 'transparent',
    title: {
      text: '车辆数',
      subtext: totalNumber,
      textStyle: {
        color: 'rgba(255,255,255,0.6)',
        align: 'center',
        fontSize: 12,
        lineHeight: 10,
      },
      subtextStyle: {
        color: '#fff',
        align: 'center',
        fontSize: 16,
        fontWeight: 'bold',
        padding: [0, 0, 0, 0],
      },
      x: '48.5%',
      y: '28%',
      textAlign: 'center',
    },
    tooltip: {
      // show: false,
      trigger: 'item',
      // borderColor: 'rgba(255,255,255,.3)',
      // backgroundColor: 'rgba(13,5,30,1)',
      // borderWidth: 1,
      padding: 5,
      formatter(parms : any) {
        const str = `${parms.marker}${parms.data.name}</br>`
                + `数量：${parms.data.value}件</br>`
                + `占比：${parms.percent}%`;
        return str;
      },
    },
    legend: {
      type: 'scroll',
      orient: 'horizontal',
      left: 'center',
      align: 'left',
      top: 'bottom',
      icon: 'circle',
      itemWidth: 8,
      itemHeight: 8,
      formatter(name : any) {
        const item = seriesData.filter((item) => item.name === name)[0];
        // return `{name|${item.name} ${item.value}}`;
        return `{name|${item.name}}`;
      },
      textStyle: {
        color: '#fff',
        rich: {
          name: {
            width: 60,
            fontSize: 12,
          },
          value: {
            width: 60,
            fontSize: 12,
          },
        },
      },
      data: legendData,
    },
    series: [{
      type: 'pie',
      center: ['50%', '42%'],
      radius: ['50%', '65%'],
      clockwise: true,
      avoidLabelOverlap: true,
      hoverOffset: 4,
      itemStyle: {
        normal: {
          color(params : any) {
            return colorList[params.dataIndex];
          },
        },
      },
      labelLine: {
        show: true,
      },
      label: {
        show: true,
        fontSize: 10,
        fontFamily: '微软雅黑',
        color: '#fff',
      },
      data: seriesData,
    }, {
      type: 'pie',
      zlevel: 3,
      silent: true,
      center: ['50%', '42%'],
      radius: ['42%', '46%'],
      label: {
        normal: {
          show: false,
        },
      },
      labelLine: {
        show: false,
      },
      data: _pie2(),
    }],
  };
}
