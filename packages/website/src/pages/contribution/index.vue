<!--
 * @Author: Lvhz
 * @Date: 2021-11-09 10:06:30
 * @Description: 贡献
-->
<template>
  <div class="page-container">
    <a-form
      class="a-form"
      :model="formState"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-item label="文件类型">
        <a-radio-group v-model:value="formState.sourceType">
          <a-radio :value="1">echart组件</a-radio>
          <!-- <a-radio :value="2">文章</a-radio> -->
        </a-radio-group>
      </a-form-item>
      <a-form-item label="图表类型">
        <a-radio-group v-model:value="formState.chartType">
          <a-radio :value="1">柱状图</a-radio>
          <a-radio :value="2">折线图</a-radio>
          <a-radio :value="3">饼图</a-radio>
          <a-radio :value="9">其他图</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-upload :file-list="fileList" :remove="handleRemove" :before-upload="beforeUpload">
        <a-button>
          <upload-outlined></upload-outlined>
          Select File
        </a-button>
      </a-upload>
      <a-button type="primary" :disabled="fileList.length === 0" :loading="uploading" style="margin-top: 16px" @click="handleUpload">
        {{ uploading ? "Uploading" : "Start Upload" }}
      </a-button>
    </a-form>
  </div>
</template>

<script>
import { CommonApi } from "@api";
import { reactive, ref, toRaw } from "vue";
import { message } from "ant-design-vue";
import { calculateFileHash } from '@/utils/file'

export default {
  setup() {
    const formState = reactive({
      name: "",
      sourceType: 1, // 1-echart，2-文章
      chartType: 1, // 1柱状图、2折线图、3饼图，9其他类型图
    });
    // 文件上传
    const fileList = ref([]);
    const uploading = ref(false);
    const handleRemove = (file) => {
      // @ts-ignore
      const index = fileList.value.indexOf(file);
      const newFileList = fileList.value.slice();
      newFileList.splice(index, 1);
      fileList.value = newFileList;
    };
    const beforeUpload = (file) => {
      // @ts-ignore
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
      };
      const res = await CommonApi.uploadfile(params);
      if (res.code === 200) {
        message.success("上传成功");
        fileList.value = []
      } else {
        message.error(res.message || "上传失败");
      }
      return res;
    }
    
    const handleUpload = async () => {
      const file = await fileUpload() // 文件上传
      console.log(file);
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
