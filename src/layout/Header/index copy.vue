<!--
 * @Author: Lvhz
 * @Date: 2021-04-14 14:37:49
 * @Description: Description
-->
<template>
  <div class="header-nav">
    <span @click="$router.push({ path: '/column' })">柱状图</span>
    <span @click="$router.push({ path: '/line' })">折线图</span>
    <span @click="$router.push({ path: '/pie' })">饼图</span>
    <span @click="$router.push({ path: '/other' })">其他图</span>
    <span @click="$router.push({ path: '/baidu-map' })">百度地图</span>
  </div>
</template>

<script>
export default {
  methods: {
  }
};
</script>

<style lang="scss" scoped>
.header-nav{
  display: flex;
  span{
    padding: 20px;
    border: 1px solid #fff;
    cursor: pointer;
  }
}
</style>
