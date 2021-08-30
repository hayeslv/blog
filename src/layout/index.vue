<!--
 * @Author: Lvhz
 * @Date: 2021-08-30 16:26:47
 * @Description: Description
-->
<template>
  <div :class="classObj" class="app-wrapper">
    <Sidebar class="sidebar-container" />
    <div :class="{hasTagsView:needTagsView}" class="main-container">
      <!-- <div :class="{'fixed-header': fixedHeader}">
        <navbar />
        <tags-view v-if="needTagsView" />
      </div> -->
      <app-main />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { AppMain, Sidebar } from './components'

// vuex
const store = useStore()
const sidebar = computed(() => store.state.app.sidebar)
const classObj = computed(() => {
  return {
    hideSidebar: !sidebar.value.opened,
    openSidebar: sidebar.value.opened,
    withoutAnimation: sidebar.value.withoutAnimation,
  }
})
const needTagsView = computed(() => store.state.settings.needTagsView)
// const fixedHeader = computed(() => store.state.settings.fixedHeader)

</script>

<style lang="scss" scoped>
@import "~@/style/mixin.scss";
@import "~@/style/variables.scss";
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;

  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}

.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px)
}

.mobile .fixed-header {
  width: 100%;
}
</style>
