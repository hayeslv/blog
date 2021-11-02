<!--
 * @Author: Lvhz
 * @Date: 2021-09-23 15:30:15
 * @Description: Description
-->
<template>
  <div class="app">
    <main-header></main-header>
    <div class="main-cnt">
      <router-view />
    </div>
  </div>
</template>

<script>
import MainHeader from "./components/main-header.vue";
export default {
  name: "app",
  components: { MainHeader },
};
</script>
