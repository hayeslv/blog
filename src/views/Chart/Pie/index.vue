<!--
 * @Author: Lvhz
 * @Date: 2021-04-14 14:30:32
 * @Description: Description
-->
<template>
  <div class="view-content">
    <Pie1 class="echart-panel"></Pie1>
    <Pie2 class="echart-panel"></Pie2>
    <Pie3 class="echart-panel"></Pie3>
    <Pie4 class="echart-panel"></Pie4>
  </div>
</template>

<script>
import Pie1 from './Pie1';
import Pie2 from './Pie2';
import Pie3 from './Pie3';
import Pie4 from './Pie4';
export default {
  components: { Pie1, Pie2, Pie3, Pie4 }
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
