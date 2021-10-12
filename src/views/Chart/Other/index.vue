<!--
 * @Author: Lvhz
 * @Date: 2021-04-14 14:30:32
 * @Description: Description
-->
<template>
  <div class="view-content">
    <Other1 class="echart-panel"></Other1>
    <!-- <Other2 class="echart-panel"></Other2> -->
  </div>
</template>

<script>
import Other1 from './Other1';
// import Other2 from './Other2';
export default {
  components: { Other1,  }
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
