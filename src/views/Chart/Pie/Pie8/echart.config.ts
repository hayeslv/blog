
/*
 * @Author: Lvhz
 * @Date: 2021-01-21 11:12:44
 * @Description: Description
 */
// import { getHeightRate } from '@/common/js/util.js';

const getPercentage = (val : number) => {
  return val ? val - 0 : 0;
};

export function getOption(value : number) {
  const per = getPercentage(value) / 100;
  const colorArr = [
    [per, '#009DFF'],
    [1, '#273143']
  ];
  return {
    series: [{
      type: 'gauge',
      center: ['50%', '50%'],
      radius: '100%',
      startAngle: 220,
      endAngle: -40,
      min: 0,
      max: 100,
      progress: {
        show: true,
        width: 12
      },

      pointer: {
        show: false
      },
      axisLine: {
        lineStyle: {
          width: 12,
          color: colorArr
        }
      },
      axisTick: {
        show: false
      },
      splitLine: {
        show: false
      },
      axisLabel: {
        show: false
      },
      anchor: {
        show: false
      },
      title: {
        show: false
      },
      detail: {
        valueAnimation: true,
        width: '60%',
        lineHeight: 40,
        height: '15%',
        borderRadius: 8,
        offsetCenter: [0, '-40%'],
        fontWeight: 'bolder',
        formatter: function(value : any) {
          return `{c|${value}%\n}{a|充电枪使用率}`;
        },
        rich: {
          c: {
            color: '#fff',
            fontSize: 30,
            padding: [0, 0, 0, 0]
          },
          a: {
            fontSize: 18,
            color: '#bbbb' 
          }
        }
      },
      data: [{
        value: value || 0
      }]
    }]
  };
}
