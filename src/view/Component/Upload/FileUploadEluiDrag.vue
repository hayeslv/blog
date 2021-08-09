<template>
  <!-- limit：列表上限为3 -->
  <!-- multiple：可多选 -->
  <!-- drag：可拖拽上传 -->
  <!-- headers：请求头信息 -->
  <!-- action：请求的地址 -->
  <!-- accept：接收的文件格式 -->
  <!-- before-upload：上传前校验 -->
  <el-upload 
    class="upload-demo" 
    accept="image/jpeg,image/gif,image/png" 
    drag 
    multiple 
    :limit="3" 
    :action="action" 
    :headers="headers" 
    :before-upload="onBeforeUpload"
    :on-success="SuccessHandler">
    <i class="el-icon-upload"></i>
    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
  </el-upload>
</template>

<script>
import { Authorization } from '@config';
export default {
  data() {
    return {
      action: '/pre/v1/file/singleUpload',
      // 请求头信息
      headers: {
        Authorization: Authorization
      }
    };
  },
  methods: {
    onBeforeUpload(file) {
      const isIMAGE_Reg = /[jpe?g|gif|png]$/; // 限制格式：jpg、jpeg、gif、png
      const isLt1M = file.size / 1024 / 1024 < 1; // 限制大小：1M以内
      if (!isIMAGE_Reg.test(file.name)) {
        this.$message.error('上传文件只能是图片格式!');
        return false;
      }
      if (!isLt1M) {
        this.$message.error('上传文件大小不能超过 1MB!');
        return false;
      }
      return true;
    },
    SuccessHandler(res) {
      // 请求返回的内容
      console.log(res);
    }
  }
};
</script>

<style lang="scss" scoped>

</style>
