/*
 * @Author: Lvhz
 * @Date: 2021-04-14 10:20:23
 * @Description: Description
 */

const colorList = ['#3196FA', '#31DA64', '#FACC14', '#EF4864', '#6236FF', '#B620E0', '#11C2C1'];

type ChartDataList = {
  name: string,
  value: number
}


const getDataList = (dataList: Array<ChartDataList>) => {
  let nameList: Array<string> = [];
  nameList = dataList.map(item => item.name);
  return { nameList };
};

export const getOption = (dataList: Array<ChartDataList>) => {
  const { nameList } = getDataList(dataList);
  const totalNum = dataList.reduce((pre, cur) => pre + cur.value, 0)
  return {
    backgroundColor: 'transparent',
    legend: {
      orient: 'vertical',
      show: true,
      right: '10%',
      y: 'center',
      itemWidth: 3,
      itemHeight: 30,
      itemGap: 20,
      textStyle: {
        color: '#7a8c9f',
        fontSize: 12,
        lineHeight: 16,
        rich: {
          percent: {
            color: '#fff',
            fontSize: 12,
          },
        },
      },
      formatter: (name: string) => {
        switch (name) {
          case nameList[0]: {
            const value = dataList[0].value;
            return (
              `${nameList[0]}\r\n{percent|${Math.floor(value * 100 / totalNum)}%} ` +
              ' ' + value
            );
          }
          case nameList[1]: {
            const value = dataList[1].value;
            return (
              `${nameList[1]}\r\n{percent|${Math.floor(value * 100 / totalNum)}%} ` +
              ' ' + value
            );
          }
          case nameList[2]: {
            const value = dataList[2].value;
            return (
              `${nameList[2]}\r\n{percent|${Math.floor(value * 100 / totalNum)}%} ` +
              ' ' + value
            );
          }
          default:
            break;
        }
      },
    },
    tooltip: {
      show: true,
    },
    series: [
      {
        type: 'pie',
        radius: ['70%', '85%'],
        center: ['40%', '50%'],
        hoverAnimation: false,
        z: 10,
        label: {
          position: 'center',
          formatter: () => {
            return `作业总数\r\n{total|${totalNum}} 个`;
          },
          rich: {
            total: {
              fontSize: 24,
              color: '#fff',
            },
          },
          color: '#7a8c9f',
          fontSize: 14,
          lineHeight: 30,
        },
        data: dataList.map((item, index) => {
          return {
            name: item.name,
            value: item.value,
            itemStyle: {
              color: colorList[index]
            }
          }
        }),
        // [
        //   {
        //     value: 30,
        //     name: '运行中',
        //     itemStyle: {
        //       color: colorList[0],
        //     },
        //   },
        //   {
        //     value: 30,
        //     name: '已停止',
        //     itemStyle: {
        //       color: colorList[1],
        //     },
        //   },
        //   {
        //     value: 40,
        //     name: '未上线',
        //     itemStyle: {
        //       color: colorList[2],
        //     },
        //   },
        // ],
        labelLine: {
          show: false,
        },
      },
      {
        type: 'pie',
        radius: ['60%', '70%'],
        center: ['40%', '50%'],
        hoverAnimation: false,
        label: {
          show: false,
        },
        data: dataList.map((item, index) => {
          return {
            name: item.name,
            value: item.value,
            itemStyle: {
              color: colorList[index],
              opacity: 0.5,
            }
          }
        }),
        // [
        //   {
        //     value: 30,
        //     name: '运行中',
        //     itemStyle: {
        //       color: colorList[0],
        //       opacity: 0.5,
        //     },
        //   },
        //   {
        //     value: 30,
        //     name: '已停止',
        //     itemStyle: {
        //       color: colorList[1],
        //       opacity: 0.5,
        //     },
        //   },
        //   {
        //     value: 40,
        //     name: '未上线',
        //     itemStyle: {
        //       color: colorList[2],
        //       opacity: 0.5,
        //     },
        //   },
        // ],
        labelLine: {
          show: false,
        },
      },
      {
        type: 'pie',
        radius: ['50%', '60%'],
        center: ['40%', '50%'],
        hoverAnimation: false,
        label: {
          show: false,
        },
        data: dataList.map((item, index) => {
          return {
            name: item.name,
            value: item.value,
            itemStyle: {
              color: colorList[index],
              opacity: 0.2,
            }
          }
        }),
        // [
        //   {
        //     value: 30,
        //     name: '运行中',
        //     itemStyle: {
        //       color: colorList[0],
        //       opacity: 0.2,
        //     },
        //   },
        //   {
        //     value: 30,
        //     name: '已停止',
        //     itemStyle: {
        //       color: colorList[1],
        //       opacity: 0.2,
        //     },
        //   },
        //   {
        //     value: 40,
        //     name: '未上线',
        //     itemStyle: {
        //       color: colorList[2],
        //       opacity: 0.2,
        //     },
        //   },
        // ],
        labelLine: {
          show: false,
        },
      },
    ],
  };
};
