<!--
 * @Author: Lvhz
 * @Date: 2020-05-24 15:14:59
 * @Descripttion: el-upload + 图片 + 自动上传 + 限制3张图片
--> 
<template>
  <div>
    <el-upload
      ref="upload"
      :action="action"
      :headers="headers"
      list-type="picture-card"
      :on-success="successCallback"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove">
      <i class="el-icon-plus"></i>
    </el-upload>
    <div style="margin-top: 10px;">
      <el-button type="primary" @click="submitHandler">表单保存（获取图片列表）</el-button>
      <el-button type="primary" @click="clearAllHandler">清除全部图片</el-button>
    </div>
    <el-dialog v-model="dialogVisible">
      <div class="preview-wrap">
        <img class="preview-img" :src="dialogImageUrl" alt="">
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { Authorization } from '@config';
import { toRaw } from '@vue/reactivity'
export default {
  data() {
    return {
      action: '/pre/v1/file/singleUpload',
      // 请求头信息
      headers: {
        Authorization: Authorization
      },
      dialogImageUrl: '', // dialog中的url
      dialogVisible: false, // 图片预览
      fileList: [] // 全部文件列表
    };
  },
  methods: {
    // 删除
    handleRemove(file) {
      this.$refs.upload.handleRemove(file);
    },
    // dialog预览
    handlePictureCardPreview(file) {
      file = toRaw(file)
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 上传前操作
    onBeforeUpload(file) {
      console.log(file);
    },
    // // 手动上传文件列表
    // uploadClickHandler() {
    //   this.$refs.upload.submit();
    // },
    // 上传成功回调
    successCallback(res, file, fileList) {
      if (res.code !== 200) { // 上传失败
        this.$message({ type: 'error', message: res.msg || res.message || '上传失败' });
        this.$refs.upload.handleRemove(file); // 清除上传失败的文件
        return;
      }
      // 传回的对象是Proxy，可以通过vue中的toRaw（）方法获取原始对象
      console.log(toRaw(fileList));
      console.log(JSON.parse(JSON.stringify(fileList))); // 或者通过json序列化的方式
      this.fileList = fileList;
    },
    // 提交
    submitHandler() {
      console.log(toRaw(this.fileList));
    },
    // 清除全部图片
    clearAllHandler() {
      this.$refs.upload.clearFiles();
    }
  }
};
</script>

<style lang="scss" scoped>
.preview-wrap{
  display: flex;
  justify-content: center;
}
.preview-img{
  height: 300px;
  width: 300px;
}
// 去掉删除提示语
/deep/.el-upload-list__item.is-success.focusing .el-icon-close-tip{
  display: none !important;
}
</style>
