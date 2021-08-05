<!--
 * @Author: Lvhz
 * @Date: 2021-04-12 16:10:04
 * @Description: 下方（nav + content）
-->
<template>
  <div class="main-content">
    <LeftNav></LeftNav>
    <div class="router-view">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import LeftNav from './LeftNav';
export default {
  components: { LeftNav }
};
</script>

<style lang="scss" scoped>
.main-content{
  display: flex;
  .router-view{
    flex: 1;
    position: relative;
  }
}
</style>
 
