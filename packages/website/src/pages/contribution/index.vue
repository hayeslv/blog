<!--
 * @Author: Lvhz
 * @Date: 2021-11-09 10:06:30
 * @Description: 贡献
-->
<template>
  <div class="page-container">
    <a-form class="a-form" :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-form-item label="文件类型">
        <a-radio-group v-model:value="formState.sourceType">
          <a-radio value="chart">图表组件</a-radio>
          <a-radio value="article">文章</a-radio>
        </a-radio-group>
      </a-form-item>
    </a-form>
    <ChartType v-if="formState.sourceType === 'chart'"></ChartType>
    <ArticalType v-if="formState.sourceType === 'article'"></ArticalType>
    <a-upload :file-list="fileList" :remove="handleRemove" :before-upload="beforeUpload">
      <a-button>
        <upload-outlined></upload-outlined>
        选择文件
      </a-button>
    </a-upload>
    <a-button type="primary" :disabled="fileList.length === 0" :loading="uploading" style="margin-top: 16px" @click="handleUpload">
      {{ uploading ? "上传中" : "开始上传" }}
    </a-button>
  </div>
</template>

<script>
import ChartType from './ChartType';
import ArticalType from './ArticalType';
import { UploadOutlined } from '@ant-design/icons-vue';

import { message } from "ant-design-vue";
import { reactive, ref, toRaw } from "vue";

import { CommonApi } from "@api";
import { calculateFileHash } from '@/utils/file'

export default {
  components: { UploadOutlined, ChartType, ArticalType },
  setup() {
    const formState = reactive({
      name: "",
      sourceType: 'chart', // 默认图表组件
    });
    const fileList = ref([]);
    const uploading = ref(false);
    const handleRemove = (file) => {
      const index = fileList.value.indexOf(file);
      const newFileList = fileList.value.slice();
      newFileList.splice(index, 1);
      fileList.value = newFileList;
    };
    const beforeUpload = (file) => {
      fileList.value = [...fileList.value, file];
      return false;
    };

    // 文件上传
    const fileUpload = async () => {
      const file = toRaw(fileList.value)[0]
      const fileHash = await calculateFileHash(file)
      const ext = file.name.split('.')[file.name.split('.').length - 1]
      const fileName = `${fileHash}.${ext}`
      // 新建File
      const renameFile = new File([file], fileName, { type: file.type })

      let sourceTypeName = '', chartTypeName = '';
      switch(formState.sourceType) {
        case 1: sourceTypeName = 'echart'; break;
        case 2: sourceTypeName = 'artical'; break;
      }
      switch(formState.chartType) {
        case 1: chartTypeName = 'column'; break;
        case 2: chartTypeName = 'line'; break;
        case 3: chartTypeName = 'pie'; break;
        case 9: chartTypeName = 'other'; break;
      }

      const params = {
        name: "file",
        dir: `${sourceTypeName}/${chartTypeName}`, // 文件夹
        file: renameFile,
        sourceType: formState.sourceType,
        chartType: formState.chartType,
        hash: fileHash
      };
      const res = await CommonApi.uploadfile(params);
      if (res.code === 200) {
        message.success("上传成功");
        fileList.value = []
        return res.data || null;
      } else {
        message.error(res.message || "上传失败");
      }
    }

    const saveDB = async (file) => {
      const res = await CommonApi.saveFileUrl({
        chartType: file.chartType,
        sourceType: file.sourceType,
        url: file.url,
        hash: file.hash
      });
      console.log(res);
    }
    
    const handleUpload = async () => {
      const file = await fileUpload() // 文件上传
      if(!file) return;
      // 保存至数据库
      await saveDB(file)
    };
    return {
      labelCol: { style: { width: "70px" } },
      wrapperCol: { span: 14 },
      formState,
      fileList,
      uploading,
      handleRemove,
      beforeUpload,
      handleUpload,
    };
  },
};
</script>

<style lang="scss" scoped>
.a-form {
  margin-top: 20px;
}
</style>
