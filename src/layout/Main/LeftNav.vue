<!--
 * @Author: Lvhz
 * @Date: 2021-08-17 15:44:10
 * @Description: Description
-->
<template>
  <div v-if="navList.length > 0" class="left-nav">
    <el-menu :default-active="defaultActive" class="left-nav-menu" router @select="handleSelect">
      <el-menu-item v-for="nav in navList" :key="nav.index" :index="nav.index">
        <i :class="[nav.icon ? nav.icon : 'el-icon-s-help']"></i>
        <template v-slot:title>
          <span>{{ nav.title }}</span>
        </template>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import { headerNav } from '@enum/nav.js';
import { commonRouteList } from '@/router';
import bus from '@bus'
export default {
  data() {
    return {
      defaultActive: '',
      navList: []
    };
  },
  mounted() {
    bus.on('HeadNavSelect', this.headNavSelect);
  },
  methods: {
    headNavSelect(key, setFirstNav) {
      const navItem = headerNav.filter(item => item.index.toString() === key.toString())[0];
      if (!navItem) return;
      // 初始化左侧导航
      this.navList = navItem.navList || [];
      if (this.navList.length <= 0) return;

      let path = this.$route.path;
      if (path === '/') path = commonRouteList[0].redirect || '/';
      this.defaultActive = path;
      if (setFirstNav) { // 是否设置第一项为当前路由
        this.defaultActive = this.navList[0].index; // 左侧导航默认选中项
        this.$router.push(this.navList[0].index);
      } else {
        this.defaultActive = path;
      }
    },
    handleSelect() {
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
