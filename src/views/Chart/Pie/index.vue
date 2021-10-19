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
    <Pie5 class="echart-panel"></Pie5>
    <Pie6 class="echart-panel"></Pie6>
    <Pie7 class="echart-panel"></Pie7>
  </div>
</template>

<script>
import Pie1 from './Pie1';
import Pie2 from './Pie2';
import Pie3 from './Pie3';
import Pie4 from './Pie4';
import Pie5 from './Pie5';
import Pie6 from './Pie6';
import Pie7 from './Pie7';
export default {
  components: { Pie1, Pie2, Pie3, Pie4, Pie5, Pie6, Pie7 }
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
