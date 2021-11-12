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
          <a-radio value="1">echart组件</a-radio>
          <!-- <a-radio value="2">文章</a-radio> -->
        </a-radio-group>
      </a-form-item>
      <a-form-item label="图表类型">
        <a-radio-group v-model:value="formState.chartType">
          <a-radio value="column">柱状图</a-radio>
          <a-radio value="line">折线图</a-radio>
          <a-radio value="pie">饼图</a-radio>
          <a-radio value="other">其他图</a-radio>
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

export default {
  setup() {
    const formState = reactive({
      name: "",
      sourceType: "1",
      chartType: "column",
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
    const handleUpload = async () => {
      const file = toRaw(fileList.value)[0]
      console.log(file);
      // const params = {
      //   name: "file",
      //   file: file,
      // };
      // const res = await CommonApi.uploadfile(params);
      // if (res.code === 200) {
      //   message.success("上传成功");
      // } else {
      //   message.error(res.message || "上传失败");
      // }
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
