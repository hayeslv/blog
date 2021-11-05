/*
 * @Author: Lvhz
 * @Date: 2021-04-14 10:20:23
 * @Description: Description
 */

const colorList = ['0, 157, 255', '127, 88, 255', '255, 79, 92', '253, 173, 67', '17, 195, 114', '0, 204, 255'];

type ChartDataList = {
  name: string,
  value: number
}
type SeriesList = {
  name: string,
  value: number,
  textStyle: any
}

// const dataList = [
//   { name: '抛洒滴漏', value: 333 },
//   { name: '违法排污', value: 113 },
//   { name: '违法广告', value: 234 },
//   { name: '交通信号灯', value: 112 },
//   { name: '渣土乱倒', value: 444 },
//   { name: '垃圾满溢', value: 222 }
// ];

const getDataList = (dataList: Array<ChartDataList>) => {
  const seriesList: Array<SeriesList> = [];
  dataList.forEach((item, index) => {
    seriesList.push({
      name: `${item.name} ${item.value}`,
      value: item.value,
      textStyle: {
        backgroundColor: `rgba(${colorList[index]}, 0.3)`,
        color: `rgb(${colorList[index]})`,
        borderRadius: 20,
        padding: [6, 12, 6, 12],
        emphasis: {
          color: '#fff'
        }
      }
    });
  });
  return { seriesList };
};

export const getOption = (dataList: Array<ChartDataList>) => {
  const { seriesList } = getDataList(dataList);
  return {
    series: [{
      type: 'wordCloud',
      clickable: true,
      sizeRange: [12, 18], // 字体大小范围
      textRotation: [0, 0], // 文字水平方向
      rotationRange: [0, 0], // 文字水平方向
      rotationStep: 45,
      gridSize: 28,
      // textPadding: [10, 30],
      autoSize: {
        enable: true,
        minSize: 10
      },
      // shape: 'triangle',
      shape: 'pentagon',
      width: '100%',
      height: '100%',
      drawOutOfBound: true, // 超出范围也显示
      textStyle: {
        normal: {
          // backgroundColor: '#fff',
          // color: function() {
          //   return 'rgb(' + [
          //     Math.round(Math.random() * 255),
          //     Math.round(Math.random() * 255),
          //     Math.round(Math.random() * 255)
          //   ].join(',') + ')';
          // }
        },
        emphasis: {
          // shadowBlur: 10,
          // shadowColor: '#333'
        }
      },
      data: seriesList
      // [
      //   {
      //     name: 'text0 1000',
      //     value: 1000,
      //     textStyle: {
      //       normal: {
      //         backgroundColor: `rgba(${colorList[0]}, 0.3)`,
      //         color: `rgb(${colorList[0]})`,
      //         borderRadius: 20,
      //         padding: [10, 20, 10, 20]
      //       },
      //       emphasis: {
      //         color: '#fff'
      //       }
      //     }
      //   },
      //   {
      //     name: 'text1 681',
      //     value: 681,
      //     textStyle: {
      //       normal: {
      //         backgroundColor: `rgba(${colorList[1]}, 0.3)`,
      //         color: `rgb(${colorList[1]})`,
      //         borderRadius: 20,
      //         padding: [10, 20, 10, 20]
      //       },
      //       emphasis: {
      //         color: '#fff'
      //       }
      //     }
      //   },
      //   {
      //     name: 'text2 436',
      //     value: 436,
      //     textStyle: {
      //       normal: {
      //         backgroundColor: `rgba(${colorList[2]}, 0.3)`,
      //         color: `rgb(${colorList[2]})`,
      //         borderRadius: 20,
      //         padding: [10, 20, 10, 20]
      //       },
      //       emphasis: {
      //         color: '#fff'
      //       }
      //     }
      //   },
      //   {
      //     name: 'text3 405',
      //     value: 405,
      //     textStyle: {
      //       normal: {
      //         backgroundColor: `rgba(${colorList[3]}, 0.3)`,
      //         color: `rgb(${colorList[3]})`,
      //         borderRadius: 20,
      //         padding: [10, 20, 10, 20]
      //       },
      //       emphasis: {
      //         color: '#fff'
      //       }
      //     }
      //   },
      //   {
      //     name: 'text4 246',
      //     value: 246,
      //     textStyle: {
      //       normal: {
      //         backgroundColor: `rgba(${colorList[4]}, 0.3)`,
      //         color: `rgb(${colorList[4]})`,
      //         borderRadius: 20,
      //         padding: [10, 20, 10, 20]
      //       },
      //       emphasis: {
      //         color: '#fff'
      //       }
      //     }
      //   }
      // ]
    }]
  };
};
