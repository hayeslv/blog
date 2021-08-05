<!--
 * @Author: Lvhz
 * @Date: 2021-04-14 14:37:49
 * @Description: Description
-->
<template>
  <div class="header">
    <el-menu
      :default-active="activeIndex"
      class="nav-menu-header"
      mode="horizontal"
      background-color="#fff"
      text-color="#000"
      active-text-color="#1890ff"
      @select="handleSelect">
      <template v-for="item in headerNav">
        <template v-if="!item.child">
          <el-menu-item :key="item.index" :index="item.index">{{ item.title }}</el-menu-item>
        </template>
        <template v-else>
          <el-submenu :key="item.index" :index="item.index">
            <template slot="title">{{ item.title }}</template>
            <el-menu-item v-for="child in item.child" :key="child.index" :index="child.index">{{ child.title }}</el-menu-item>
          </el-submenu>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
import { headerNav } from '@enum/nav.js';
import { commonRouteList } from '@/router';
export default {
  data() {
    return {
      activeIndex: '1',
      headerNav: headerNav
    };
  },
  mounted() {
    // 初始化选中第一项
    setTimeout(() => {
      let { path } = this.$route;
      if (path === '/') path = commonRouteList[0].redirect || '/';
      for (let i = 0; i < headerNav.length; i++) {
        const navList = headerNav[i].navList || [];
        const list = navList.filter(item => item.index === path);
        if (list.length === 0) continue;
        // 初始化头部高亮
        list[0] && (this.activeIndex = headerNav[i].index.toString());
        // 初始化下方导航和路由显示内容
        this.handleSelect(headerNav[i].index.toString());
      }
    }, 100);
  },
  methods: {
    handleSelect(key, keyPath) {
      this.$bus.$emit('HeadNavSelect', key);
    }
  }
};
</script>

<style lang="scss" scoped>
.header{
  width: 100%;
}
.nav-menu-header{
  display: flex;
  justify-content: flex-end;
  padding-right: 30px;
  :hover{
    background-color: #fff !important;
  }
  span{
    padding: 20px;
    border: 1px solid #fff;
    cursor: pointer;
    color: #2e2727;
  }
}
</style>
