<!--
 * @Author: Lvhz
 * @Date: 2021-08-17 10:32:13
 * @Description: Description
-->
<template>
  <router-view />
</template>

<script>
import store from '@/store'
import _ from 'lodash'
import { provide } from 'vue'
export default{
  name: 'App',
  setup() {
    _.each(store, (item, index) => {
      provide(index, item)
    })
  }
}
</script>

<style>
html, body{
  padding: 0;
  margin: 0;
  height: 100%;
}
#app{
  height: 100%;
}
</style>
