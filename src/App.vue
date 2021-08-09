<!--
 * @Author: Lvhz
 * @Date: 2021-04-13 15:14:37
 * @Description: Description
-->
<template>
  <div id="app" class="web-screen">
    <Header class="app-header-nav"></Header>
    <Main class="app-main"></Main>
  </div>
</template>

<script>
import Main from '@/layout/Main';
import Header from '@/layout/Header';
export default {
  name: 'App',
  components: { Main, Header }
};
</script>

<style lang="scss">
@font-face {
  font-family: titleFont;
  src: url('./assets/font/title-font.ttf');
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: #fff;
  color: #000;
  user-select:none;
  display: flex;
  flex-direction: column;
}
.app-header-nav{
  width: 100%;
  height: 64px;
}
.app-main{
  height: calc(100% - 64px);
}

</style>
