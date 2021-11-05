<!--
 * @Author: Lvhz
 * @Date: 2021-08-20 09:56:10
 * @Description: 普通上传（加拖拽功能）
-->
<template>
  <div>
    <UploadStyle
      :src="imgSrc"
      @click="handlerClick"
      @dragover="handlerDragover"
      @dragleave="handlerDragleave"
      @drop="handlerDrop"
    ></UploadStyle>
    <input
      ref="fileInput"
      style="display: none"
      type="file"
      name="file"
      @change="handlerFileChange"
    />
    <a-progress
      style="margin-top: 20px; width: 500px; display: block;"
      :strokeWidth="20"
      :percent="uploadProgress"
    />
    <a-button type="primary" style="margin-top: 20px" @click="handlerSubmit">点击上传</a-button>
  </div>
</template>

<script>
import UploadStyle from "./upload-style.vue";
import { file2Base64 } from "@/utils/file";
import { CommonApi } from "@api";
import { ref } from "vue";
import { message } from "ant-design-vue";

export default {
  components: { UploadStyle },
  setup() {
    const fileRef = ref(null);
    const imgSrc = ref(null);
    const uploadProgress = ref(0);

    // input内容发生变化
    const handlerFileChange = async (e) => {
      const [file] = e.target.files;
      if (!file) return null;
      fileRef.value = file;
      // 图片转base64
      imgSrc.value = await file2Base64(file);
    };

    // 上传按钮点击
    const handlerSubmit = async () => {
      if (!fileRef.value) return;
      const params = {
        name: "file",
        file: fileRef.value,
      };
      const res = await CommonApi.uploadfile(params, {
        onUploadProgress: (progress) => {
          console.log(((progress.loaded / progress.total) * 100).toFixed(2));
          uploadProgress.value = Number(
            ((progress.loaded / progress.total) * 100).toFixed(2)
          );
        },
      });
      if (res.code === 200) {
        message.success("上传成功");
      } else {
        uploadProgress.value = 0;
        message.error(res.message || "上传失败");
      }
    };

    // input点击事件
    const inputClickHandler = () => {
      const fileInput = ref(null);
      const handlerClick = () => {
        fileInput.value.click();
      };
      return { fileInput, handlerClick };
    };

    // 拖拽事件
    const dragHandler = () => {
      // 拖进来
      const handlerDragover = (e) => {
        e.preventDefault();
        e.target.style.borderColor = "red";
      };
      // 拖出去
      const handlerDragleave = (e) => {
        e.preventDefault();
        e.target.style.borderColor = "#eee";
      };
      // 放下
      const handlerDrop = async (e) => {
        e.preventDefault();
        const fileList = e.dataTransfer.files;
        e.target.style.borderColor = "#eee";
        const file = fileList[0];
        fileRef.value = file;
        console.log(fileRef);

        // 图片转base64
        const base64Src = await file2Base64(file);
        imgSrc.value = base64Src;
      };

      return { handlerDragover, handlerDragleave, handlerDrop };
    };

    return {
      imgSrc,
      uploadProgress,
      handlerFileChange,
      handlerSubmit,
      ...inputClickHandler(),
      ...dragHandler(),
    };
  },
};
</script>

<style lang="scss" scoped></style>
