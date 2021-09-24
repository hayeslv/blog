<!--
 * @Author: Lvhz
 * @Date: 2021-09-24 09:31:06
 * @Description: 签名
-->
<template>
  <div class="signature-box" @touchmove.prevent>
    <canvas
      ref="myCanvas"
      class="signature-canvas"
      :width="width"
      :height="height"
      @mousedown="canvasDown($event)"
      @mousemove="canvasMove($event)"
      @mouseup="canvasUp"
      @mouseleave="canvasLeave"
    >抱歉，您的浏览器不支持canvas元素</canvas>
    <!-- <span class="mt-a" @click="clear">清除</span>
    <span class="mt-b" @click="getPic">确认</span> -->
  </div>
  <!-- <div @click="download" v-if="imgSrc" class="save">下载图片</div> -->
</template>

<script>
import { ref, reactive, toRefs, onMounted } from "vue"
export default {
  props: {
    width: { type: String, default: "500" },
    height: { type: String, default: "300" }
  },
  setup() {
    const myCanvas = ref(null);
    const data = reactive({
      ctx: null,
      canvasMoveUse: false,
      imgSrc: ''
    })

    const clear = () => {
      data.ctx.clearRect(0, 0, data.ctx.canvas.width, data.ctx.canvas.height);
      data.imgSrc = '';
    }
    const getPic = () => {
      let base64Img = myCanvas.value.toDataURL("image/png"); // png | jpeg | webp
      data.imgSrc = base64Img
      return base64Img
    }
    const download = () => {
      let elA = document.createElement('a')
      elA.download = ''; // 设置下载的文件名，默认是“下载”
      elA.href = data.imgSrc;
      document.body.appendChild(elA);
      elA.click();
      elA.remove(); // 下载之后把创建的元素删除
      data.imgSrc = '';
    }
    const canvasDown = e => {
      data.canvasMoveUse = true;
      const canvasX = e.offsetX;
      const canvasY = e.offsetY;
      data.ctx.beginPath(); // 移动的起点
      data.ctx.moveTo(canvasX, canvasY);
    }
    const canvasMove = e => {
      if(data.canvasMoveUse) {
        let canvasX = e.offsetX;
        let canvasY = e.offsetY;
        data.ctx.lineTo(canvasX, canvasY);
        data.ctx.stroke()
      }
    }
    const canvasUp = () => {
      data.canvasMoveUse = false;
    }
    const canvasLeave = () => {
      data.canvasMoveUse = false;
    }

    onMounted(() => {
      data.ctx = myCanvas.value.getContext("2d")
      data.ctx.lineWidth = 5;
    })

    return {
      ...toRefs(data),
      myCanvas,
      clear,
      getPic,
      download,
      canvasDown,
      canvasMove,
      canvasUp,
      canvasLeave
    }
  },
};
</script>

<style lang="scss" scoped>
* {
  touch-action: pan-y;
}
.signature-box {
  z-index: 9999;
  background: #f2f3f7;
  position: relative;
}
.signature-canvas {
  display: block;
  margin: 0 auto;
  background: #fff;
  cursor: default;
  border:1px solid #ccc;
  border-radius: 20px;
}
</style>
