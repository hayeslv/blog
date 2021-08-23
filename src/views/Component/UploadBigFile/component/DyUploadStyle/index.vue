<!--
 * @Author: Lvhz
 * @Date: 2021-08-20 10:41:18
 * @Description: Description
-->
<template>
  <div class="dy-upload">
    <!-- 拖拽层 -->
    <div class="dy-upload-dragger" v-if="!props.src">
      <i class="dy-icon-upload iconfont icon-upload-cloud" alt=""></i>
      <div class="dy-upload__text">将文件拖到此处，或<em>点击上传</em></div>
    </div>
    <div class="dy-upload__image-wrap" v-else>
      <img class="dy-upload__show-image" :src="props.src" alt="">
    </div>
    <!-- <input class="dy-upload__input" type="file"> -->
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  src: {
    type: String,
    default: ''
  }
})

</script>

<style lang="scss" scoped>

.dy-upload{
  width: 360px;
  height: 180px;
}
// .dy-upload__input{
//   display: none;
// }
.dy-upload-dragger{
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
  &:hover{
    border-color: $dy-color-primary;
  }
  .dy-icon-upload{
    pointer-events: none;
    font-size: 50px;
    color: $dy-text-color-placeholder;
    margin: 40px 0 16px;
    line-height: 50px;
  }
  .dy-upload__text{
    pointer-events: none;
    font-size: 14px;
    text-align: center;
    color: $dy-text-color-regular;
    em{
      font-style: normal;
      color: $dy-color-primary;
    }
  }
}
.dy-upload__image-wrap{
  width: 100%;
  height: 100%;
  .dy-upload__show-image{
    width: 100%;
    height: 100%;
  }
}
</style>
