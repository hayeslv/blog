<!--
 * @Author: Lvhz
 * @Date: 2021-11-05 10:53:37
 * @Description: Description
-->
<template>
  <div class="big-file-upload">
    <h2>1、普通上传（加拖拽功能）</h2>
    <UploadFile1></UploadFile1>
    <h2>2、二进制信息确认文件格式</h2>
    <UploadFile2></UploadFile2>
  </div>
</template>

<script>
import UploadFile1 from "@/components/common/easy-upload/upload-file1.vue";
import UploadFile2 from "@/components/common/easy-upload/upload-file2.vue";
export default {
  components: { UploadFile1, UploadFile2 },
};
</script>

<style lang="scss" scoped>
.big-file-upload{
  h2 {
    margin: 20px 0;
    font-weight: bold;
  }
  h2:nth-of-type(1) {
    margin-top: 0;
  }
}
</style>
