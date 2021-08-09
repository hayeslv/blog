<template>
  <div>
    <div class="block">
      <h2>Element-UI 拖拽上传</h2>
      <FileUploadEluiDrag></FileUploadEluiDrag>
    </div>
    <div class="liner"></div>
    <div class="block">
      <h2>Element-UI 文件缩略图（设置只接受图片、自动上传）</h2>
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
