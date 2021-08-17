<template>
  <div class="chart-standard">
    <Word></Word>
  </div>
</template>

<script>
import Word from './Word';
export default {
  components: { Word }
};
</script>

<style lang="scss" scoped>
.chart-standard{
  padding: 30px;
  box-sizing: border-box;
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
}

</style>
