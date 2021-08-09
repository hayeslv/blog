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
      :limit="3" 
      list-type="picture-card" 
      accept="image/*" 
      :before-upload="onBeforeUpload" 
      :on-success="SuccessHandler">
      <i slot="default" class="el-icon-plus"></i>
      <div slot="file" slot-scope="{file}" class="img-wrap">
        <img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
        <span class="el-upload-list__item-actions">
          <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
            <i class="el-icon-zoom-in"></i>
          </span>
          <span class="el-upload-list__item-delete" @click="handleRemove(file)">
            <i class="el-icon-delete"></i>
          </span>
        </span>
      </div>
    </el-upload>
    <!-- <div style="margin-top: 10px;">
      <el-button type="primary" @click="uploadClickHandler">上传（可删除）</el-button>
    </div> -->
    <div style="margin-top: 10px;">
      <el-button type="primary" @click="submitHandler">表单保存（获取图片列表）</el-button>
      <el-button type="primary" @click="clearAllHandler">清除全部图片</el-button>
    </div>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
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
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 上传前操作
    onBeforeUpload(file) {
    },
    // // 手动上传文件列表
    // uploadClickHandler() {
    //   this.$refs.upload.submit();
    // },
    // 上传成功回调
    SuccessHandler(res, file, fileList) {
      if (res.code !== 200) { // 上传失败
        this.$message({ type: 'error', message: res.msg || res.message || '上传失败' });
        this.$refs.upload.handleRemove(file); // 清除上传失败的文件
        return;
      }
      this.fileList = fileList;
    },
    // 提交
    submitHandler() {
      console.log(this.fileList);
    },
    // 清除全部图片
    clearAllHandler() {
      this.$refs.upload.clearFiles();
    }
  }
};
</script>

<style lang="scss" scoped>
// 是否让图片铺满（铺满则打开，显示图片正常比例则注释掉这里）
.img-wrap{
  height: 100%;
  width: 100%;
}
</style>
