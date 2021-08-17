<template>
  <div>
    <div class="block">
      <h2>jquery3D 可拖拽的旋转图片墙</h2>
      <DragablePics></DragablePics>
    </div>
    <div class="liner"></div>
  </div>
</template>

<script>
import DragablePics from './DragablePics';
export default {
  components: { DragablePics }
};
</script>

<style lang="scss" scoped>
h2{
  font-weight: bold;
  margin-bottom: 5px;
}
.liner{
  width: 100%;
  height: 2px;
  background-color: #bbb;
  margin: 30px 0;
}
</style>
