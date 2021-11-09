/*
 * @Author: Lvhz
 * @Date: 2021-01-21 11:12:44
 * @Description: Description
 */

const colorList = ["#FACC14", "#31DA64", "#3196FA"];

const dataList = [
  { name: "今日结案", value: 3456 },
  { name: "今日立案", value: 3456 },
  { name: "今日上报", value: 8456 },
];
// const yAxisDataList = [];
// dataList.forEach(value => {
//   yAxisDataList.push(value.value);
// });

const getDataList = (dataList) => {
  let yAxisDataList = [];
  let valueList = [];
  if (!dataList || !Array.isArray(dataList))
    return { yAxisDataList, valueList };
  yAxisDataList = dataList.map((item) => item.value);
  valueList = dataList;
  return { yAxisDataList, valueList };
};

export function getOption(dataList1) {
  console.log(dataList1);
  const { yAxisDataList, valueList } = getDataList(dataList);
  return {
    backgroundColor: "transparent",
    xAxis: {
      splitLine: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      axisLabel: {
        show: false,
      },
      axisTick: {
        show: false,
      },
    },
    grid: {
      left: "20%",
      top: 0, // 设置条形图的边距
      right: "5%",
      bottom: 0,
    },
    yAxis: [
      {
        type: "category",
        inverse: false,
        data: yAxisDataList,
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
      },
      {
        type: "category",
        inverse: false,
        data: yAxisDataList,
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          show: true,
          inside: false,
          textStyle: {
            color: "#fff",
            fontSize: 12,
            padding: [0, 0, 0, -50],
          },
        },
      },
    ],
    series: [
      {
        // 内
        type: "bar",
        barWidth: 18,
        legendHoverLink: false,
        silent: true,
        itemStyle: {
          normal: {
            color: function (params) {
              var color;
              if (params.dataIndex === 0) {
                color = colorList[0];
              } else if (params.dataIndex === 1) {
                color = colorList[1];
              } else if (params.dataIndex === 2) {
                color = colorList[2];
              }
              return color;
            },
          },
        },
        label: {
          normal: {
            show: true,
            position: "left",
            formatter: "{b}",
            textStyle: {
              color: "rgba(255,255,255,0.8)",
              fontSize: 12,
            },
          },
        },
        data: valueList,
        z: 1,
        animationEasing: "elasticOut",
      },
      {
        // 分隔
        type: "pictorialBar",
        itemStyle: {
          normal: {
            color: "rgba(0,34,92,1)",
          },
        },
        symbolRepeat: "fixed",
        symbolMargin: 5,
        symbol: "rect",
        symbolClip: true,
        symbolSize: [4, 22],
        symbolPosition: "start",
        symbolOffset: [-4, 0],
        data: valueList,
        z: 2,
        animationEasing: "elasticOut",
      },
    ],
  };
}
