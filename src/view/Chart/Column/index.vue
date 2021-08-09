<!--
 * @Author: Lvhz
 * @Date: 2021-04-14 14:21:42
 * @Description: Description
-->
<template>
  <div class="view-content">
    <Column1 class="column"></Column1>
    <Column2 class="column"></Column2>
    <Column3 class="column"></Column3>
  </div>
</template>

<script>
import Column1 from './Column1';
import Column2 from './Column2';
import Column3 from './Column3';
export default {
  components: { Column1, Column2, Column3 }
};
</script>

<style lang="scss" scoped>
.view-content{
  box-sizing: border-box;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.column{
  margin-bottom: 20px;
}
</style>
