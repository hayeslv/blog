<!--
 * @Author: Lvhz
 * @Date: 2021-04-14 14:30:32
 * @Description: 大屏组件
-->
<template>
  <div class="view-content">
    <Screen1 class="echart-panel"></Screen1>
    <Screen2 class="echart-panel"></Screen2>
    <Screen3 class="echart-panel"></Screen3>
  </div>
</template>

<script>
import Screen1 from './Screen1';
import Screen2 from './Screen2';
import Screen3 from './Screen3';
export default {
  components: { Screen1, Screen2, Screen3 }
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
