<!--
 * @Author: Lvhz
 * @Date: 2021-09-23 15:30:15
 * @Description: Description
-->
<template>
  <div class="app" :class="{ 'is-component': isComponent }">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </div>
  <router-view />
</template>
<script>
export default {
  name: "app",
  computed: {
    isComponent() {
      return /^component-/.test(this.$route.name || "");
    },
  },
};
</script>
