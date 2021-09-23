<!--
 * @Author: Lvhz
 * @Date: 2021-09-23 16:22:29
 * @Description: Description
-->
<template>
  <button>
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { props } from './props'
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'ElButton',
  props
});
</script>

<style lang="scss" scoped>

</style>
