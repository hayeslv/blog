<!--
 * @Author: Lvhz
 * @Date: 2021-08-20 09:56:10
 * @Description: Description
-->
<template>
  <div>
    <DyUploadStyle @click="handlerClick" :src="imgSrc"></DyUploadStyle>
    <input ref="fileInput" style="display: none;" type="file" name="file" @change="handlerFileChange">
    <el-button type="primary" style="margin-top: 20px;" @click="handlerSubmit">点击上传</el-button>
  </div>
</template>

<script setup>
import DyUploadStyle from './component/DyUploadStyle'
import { ElMessage } from 'element-plus'
import { CommonApi } from '@api'
import { ref } from 'vue'

const fileInput = ref(null)
const fileRef = ref(null)
const imgSrc = ref(null)

const handlerClick = () => {
  fileInput.value.click()
}

const handlerFileChange = (e) => {
  const [file] = e.target.files
  if (!file) return null
  fileRef.value = file
  console.log(file);
  // 图片转base64
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function() {
    imgSrc.value = this.result
  };
}

const handlerSubmit = async () => {
  if(!fileRef.value) return
  const params = {
    name: 'file',
    file: fileRef.value
  }
  const res = await CommonApi.uploadfile(params)
  if(res.code === 200) {
    ElMessage.success('上传成功')
  } else {
    ElMessage.error(res.message || '上传失败');
  }
}
</script>

<style lang="scss" scoped>
</style>
