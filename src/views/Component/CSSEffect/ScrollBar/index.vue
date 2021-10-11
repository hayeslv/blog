<!--
 * @Author: Lvhz
 * @Date: 2021-09-28 14:38:02
 * @Description: 滚动条样式
-->
<template>
  <div></div>
</template>

<script>
export default {
};
</script>

<style lang="scss" scoped>

.table-content {
  height: 200px;
  overflow: scroll;
  overflow-x: hidden; // 隐藏下方滚动条
  transition-duration: 0.5s;
  &::-webkit-scrollbar {
    width: 4px;
    height: 193px;
    background: rgba(16, 78, 144, 0.52);
  }
  &::-webkit-scrollbar-thumb {
    width: 4px;
    height: 50px;
    background: #246eff;
    border-radius: 6px;
  }
}
</style>
