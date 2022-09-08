<template>
  <MainHeader />
  <div class="main-cnt">
    <router-view />
  </div>
</template>

<script lang="ts" setup>
import MainHeader from "./layout/main-header.vue";
</script>
