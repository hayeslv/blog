<!--
 * @Author: Lvhz
 * @Date: 2021-08-17 10:32:13
 * @Description: Description
-->
<template>
  <Header class="app-header-nav"></Header>
  <Main class="app-main"></Main>
</template>

<script>
import Main from '@/layout/Main';
import Header from '@/layout/Header';
export default{
  name: 'App',
  components: { Main, Header },
  setup() {
    
  },
}
</script>

<style>
html, body{
  padding: 0;
  margin: 0;
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
  text-align: left;
  /* 上下结构 */
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
