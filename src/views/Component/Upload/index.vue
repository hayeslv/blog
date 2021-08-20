<!--
 * @Author: Lvhz
 * @Date: 2021-08-17 15:54:02
 * @Description: 文件上传
-->
<template>
  <div>
    <div class="block">
      <h2>Element-UI 拖拽上传</h2>
      <FileUploadEluiDrag></FileUploadEluiDrag>
    </div>
    <div class="liner"></div>
    <div class="block">
      <h2>Element-UI 图片墙（自动上传）</h2>
      <FileUploadEluiImage></FileUploadEluiImage>
    </div>
  </div>
</template>

<script>
import FileUploadEluiDrag from './FileUploadEluiDrag';
import FileUploadEluiImage from './FileUploadEluiImage';
export default {
  components: { FileUploadEluiDrag, FileUploadEluiImage }
};
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
