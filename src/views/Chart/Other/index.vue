<!--
 * @Author: Lvhz
 * @Date: 2021-04-14 14:30:32
 * @Description: Description
-->
<template>
  <div class="view-content">
    <Other1 class="echart-panel"></Other1>
    <Other2 class="echart-panel"></Other2>
    <Other3 class="echart-panel"></Other3>
    <Other4 class="echart-panel"></Other4>
    <Other5 class="echart-panel"></Other5>
    <Other6 class="echart-panel"></Other6>
  </div>
</template>

<script>
import Other1 from './Other1';
import Other2 from './Other2';
import Other3 from './Other3';
import Other4 from './Other4';
import Other5 from './Other5';
import Other6 from './Other6';
export default {
  components: { Other1, Other2, Other3, Other4, Other5, Other6 }
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
