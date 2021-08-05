<template>
  <div v-if="navList.length > 0" class="left-nav">
    <el-menu :default-active="defaultActive" class="left-nav-menu" router @select="handleSelect">
      <el-menu-item v-for="nav in navList" :key="nav.index" :index="nav.index">
        <i :class="[nav.icon ? nav.icon : 'el-icon-s-help']"></i>
        <span slot="title">{{ nav.title }}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import { headerNav } from '@enum/nav.js';
export default {
  data() {
    return {
      defaultActive: '',
      navList: []
    };
  },
  mounted() {
    this.$bus.$on('HeadNavSelect', this.headNavSelect);
  },
  methods: {
    headNavSelect(key) {
      const navItem = headerNav.filter(item => item.index.toString() === key.toString())[0];
      if (!navItem) return;
      // 初始化左侧导航
      this.navList = navItem.navList || [];
      if (this.navList.length <= 0) return;

      // 左侧导航默认选中项
      // this.defaultActive = this.navList[0].index;
      // 路由跳转至默认选中项
      // this.$router.push(this.navList[0].index);
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

<style lang="scss" scoped>
.left-nav{
  width: 260px;
}
.left-nav-menu{
  height: 100%;
}
</style>
