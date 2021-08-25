<!--
 * @Author: Lvhz
 * @Date: 2021-08-20 09:50:50
 * @Description: 大文件上传（独立页面组件）
-->
<template>
  <div>
    <div class="block">
      <h2>1、普通上传（加拖拽功能）</h2>
      <UploadFile1></UploadFile1>
    </div>
    <div class="liner"></div>
    <div class="block">
      <h2>2、二进制确认文件格式（png、jpg、gif）</h2>
      <UploadFile2></UploadFile2>
    </div>
    <div class="liner"></div>
    <div class="block">
      <h2>3、计算md5（大文件上传前提）</h2>
      <UploadFile3></UploadFile3>
    </div>
    <div class="liner"></div>
    <div class="block">
      <h2>4、切片上传，文件合并</h2>
      <UploadFile4></UploadFile4>
    </div>
    <div class="liner"></div>
    <div class="block">
      <h2>5、断点续传</h2>
      <UploadFile5></UploadFile5>
    </div>
    <div class="liner"></div>
    <div class="block">
      <h2>6、并发数控制+报错重试</h2>
      <UploadFile6></UploadFile6>
    </div>
    <div class="liner"></div>
  </div>
</template>

<script setup>
import './assets/font.css'
import UploadFile1 from './UploadFile1'
import UploadFile2 from './UploadFile2'
import UploadFile3 from './UploadFile3'
import UploadFile4 from './UploadFile4'
import UploadFile5 from './UploadFile5'
import UploadFile6 from './UploadFile6'
</script>

<style lang="scss" scoped>
h2{
  font-weight: bold;
  margin-bottom: 5px;
}
.liner{
  width: 100%;
  height: 2px;
  background-color: #bbb;
  margin: 30px 0;
}
</style>
