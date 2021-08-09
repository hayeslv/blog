<template>
  <el-upload class="upload-demo" drag :action="action" :headers="headers" :on-success="SuccessHandler">
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
    SuccessHandler(res) {
      // 请求返回的内容
      console.log(res);
    }
  }
};
</script>

<style lang="scss" scoped>

</style>
