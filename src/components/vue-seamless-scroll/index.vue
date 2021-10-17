<!--
 * @Author: Lvhz
 * @Date: 2021-10-15 16:30:32
 * @Description: 无缝滚动（vue-seamless-scroll）、待研究
-->
<template>
  <div>
    <vue-seamless-scroll class="warp" :data="dataList" :class-option="defaultOption">
      <!-- :style="rowHeightStyle" -->
      <div class="row" v-for="(item, index) in dataList" :key="index" >
        <span>{{ item.name }}</span>
        <span>{{ item.value }}</span>
      </div>
    </vue-seamless-scroll>
  </div>
</template>

<script>
export default {
  computed: {
    // 滚动配置参数
    defaultOption() {
      return {
        step: 0.2, // 数值越大速度滚动越快
        // limitMoveNum: 2, // 开始无缝滚动的数据量 this.dataList.length
        hoverStop: true, // 是否开启鼠标悬停stop
        direction: 1, // 0向下 1向上 2向左 3向右
        openWatch: true, // 开启数据实时监控刷新dom
        singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
        singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
        waitTime: 1000, // 单步运动停止的时间(默认值1000ms)
      };
    },
  }
};
</script>

<style lang="scss" scoped>

</style>
