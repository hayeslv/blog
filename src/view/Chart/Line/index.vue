<!--
 * @Author: Lvhz
 * @Date: 2021-04-14 14:30:32
 * @Description: Description
-->
<template>
  <div class="left-one">
    <Line1 class="line"></Line1>
    <Line2 class="line"></Line2>
    <Line3 class="line"></Line3>
  </div>
</template>

<script>
import Line1 from './Line1';
import Line2 from './Line2';
import Line3 from './Line3';
export default {
  components: { Line1, Line2, Line3 }
};


// 解决 渐变柱状图的图例也会变成渐变方法
// legend: {
//   formatter: function(value) {
//     let key = 0;
//     for(let i=0; i<nameList.length; i++) {
//       if(value === nameList[i]) key = i;
//     }
//     return `{${key}|}{word|这段文本采用样式b}`;
//   },
//   textStyle: {
//     color: '#fff',
//     fontSize: getHeightRate() * 20,
//     rich: {
//       0: {
//         width: getHeightRate() * 20,
//         height: getHeightRate() * 10,
//         backgroundColor: colorList[0]
//       },
//       1: {
//         width: getHeightRate() * 20,
//         height: getHeightRate() * 10,
//         backgroundColor: colorList[1]
//       },
//       2: {
//         width: getHeightRate() * 20,
//         height: getHeightRate() * 10,
//         backgroundColor: colorList[2]
//       },
//       word: {
//         color: '#bbb',
//         fontSize: getHeightRate() * 20
//       }
//     }
//   }
// }


</script>

<style lang="scss" scoped>
.left-one{
  position: absolute;
  top: 110px;
  left: 70px;
}
.line{
  margin-bottom: 20px;
}
</style>
