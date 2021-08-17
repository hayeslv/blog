<!--
 * @Author: Lvhz
 * @Date: 2021-04-14 14:30:32
 * @Description: Description
-->
<template>
  <div class="left-one">
    <Other1 class="mixin"></Other1>
    <Other2 class="mixin"></Other2>
  </div>
</template>

<script>
import Other1 from './Other1';
import Other2 from './Other2';
export default {
  components: { Other1, Other2 }
};
</script>

<style lang="scss" scoped>
.left-one{
  position: absolute;
  top: 110px;
  left: 70px
}
.mixin{
  margin-bottom: 20px;
}
</style>
