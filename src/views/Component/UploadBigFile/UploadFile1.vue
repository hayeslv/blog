<!--
 * @Author: Lvhz
 * @Date: 2021-08-20 09:56:10
 * @Description: Description
-->
<template>
  <div>
    <DyUploadStyle @click="handlerClick"></DyUploadStyle>
    <input style="display: none;" type="file" name="file" @change="handleFilerChange">
  </div>
</template>

<script setup>
import DyUploadStyle from './component/DyUploadStyle'
const handlerClick = () => {
  console.log(1233);
}
</script>

<style lang="scss" scoped>
</style>
