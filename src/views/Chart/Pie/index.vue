<!--
 * @Author: Lvhz
 * @Date: 2021-04-14 14:30:32
 * @Description: Description
-->
<template>
  <div class="left-one">
    <Pie1 class="pie"></Pie1>
    <Pie2 class="pie"></Pie2>
    <Pie3 class="pie"></Pie3>
  </div>
</template>

<script>
import Pie1 from './Pie1';
import Pie2 from './Pie2';
import Pie3 from './Pie3';
export default {
  components: { Pie1, Pie2, Pie3 }
};
</script>

<style lang="scss" scoped>
.left-one{
  position: absolute;
  top: 110px;
  left: 70px
}
.pie{
  margin-bottom: 20px;
}
</style>
