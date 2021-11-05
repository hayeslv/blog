<!--
 * @Author: Lvhz
 * @Date: 2021-11-05 10:13:39
 * @Description: Description
-->
<template>
  <div class="easy-upload">
    <!-- 拖拽层 -->
    <div class="easy-upload-dragger" v-if="!props.src">
      <i class="easy-icon-upload iconfont icon-upload-cloud" alt=""></i>
      <div class="easy-upload__text">将文件拖到此处，或<em>点击上传</em></div>
    </div>
    <div class="easy-upload__image-wrap" v-else>
      <img class="easy-upload__show-image" :src="props.src" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      default: "",
    },
  },
};
</script>

<style lang="scss" scoped>
.easy-upload {
  width: 360px;
  height: 180px;
}
// .easy-upload__input{
//   display: none;
// }
.easy-upload-dragger {
  width: 360px;
  height: 180px;
  background-color: #fff;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  box-sizing: border-box;
  text-align: center;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  &:hover {
    border-color: $easy-color-primary;
  }
  .easy-icon-upload {
    pointer-events: none;
    font-size: 50px;
    color: $easy-text-color-placeholder;
    margin: 40px 0 16px;
    line-height: 50px;
  }
  .easy-upload__text {
    pointer-events: none;
    font-size: 14px;
    text-align: center;
    color: $easy-text-color-regular;
    em {
      font-style: normal;
      color: $easy-color-primary;
    }
  }
}
.easy-upload__image-wrap {
  width: 100%;
  height: 100%;
  .easy-upload__show-image {
    width: 100%;
    height: 100%;
  }
}
</style>
