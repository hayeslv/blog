<!--
 * @Author: Lvhz
 * @Date: 2021-04-14 14:21:42
 * @Description: Description
-->
<template>
  <div class="view-content">
    <Column1 class="echart-panel"></Column1>
    <Column2 class="echart-panel"></Column2>
    <Column3 class="echart-panel"></Column3>
    <Column4 class="echart-panel"></Column4>
    <Column5 class="echart-panel"></Column5>
    <Column6 class="echart-panel"></Column6>
  </div>
</template>

<script>
import Column1 from './components/Column1';
import Column2 from './components/Column2';
import Column3 from './components/Column3';
import Column4 from './components/Column4';
import Column5 from './components/Column5';
import Column6 from './components/Column6';
export default {
  components: { Column1, Column2, Column3, Column4, Column5, Column6 },
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
.view-content{
  box-sizing: border-box;
  padding: 20px;
  display: flex;
  // justify-content: space-between;
  flex-wrap: wrap;
}
.echart-panel{
  margin-bottom: 20px;
  margin-right: 50px;
}
</style>
