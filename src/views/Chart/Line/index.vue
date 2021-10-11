<!--
 * @Author: Lvhz
 * @Date: 2021-04-14 14:30:32
 * @Description: Description
-->
<template>
  <div class="view-content">
    <Line1 class="echart-panel"></Line1>
    <Line2 class="echart-panel"></Line2>
    <Line3 class="echart-panel"></Line3>
  </div>
</template>

<script>
import Line1 from './Line1';
import Line2 from './Line2';
import Line3 from './Line3';
export default {
  components: { Line1, Line2, Line3 }
};




</script>

<style lang="scss" scoped>
.view-content{
  box-sizing: border-box;
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
}
.echart-panel{
  margin-bottom: 20px;
  margin-right: 50px;
}
</style>
