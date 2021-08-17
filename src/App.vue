<!--
 * @Author: Lvhz
 * @Date: 2021-08-17 10:32:13
 * @Description: Description
-->
<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </div>
  <router-view></router-view>
</template>

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
</style>
