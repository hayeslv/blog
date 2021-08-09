<template>
  <div>
    <h2>Element-UI 拖拽上传</h2>
    <FileUploadElui></FileUploadElui>
    <h2>Element-UI 文件缩略图</h2>
  </div>
</template>

<script>
import FileUploadElui from './FileUploadElui';
export default {
  components: { FileUploadElui }
};
</script>

<style lang="scss" scoped>
h2{
  font-weight: bold;
}
</style>
