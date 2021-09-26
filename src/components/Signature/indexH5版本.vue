<!--
 * @Author: Lvhz
 * @Date: 2021-09-24 09:31:06
 * @Description: 签名：H5端签名
-->
<template>
  <div class="signature-box">
    <canvas
      ref="myCanvas"
      class="signature-canvas"
      :width="width"
      :height="height"
      @touchstart="canvasDown($event)"
      @touchmove="canvasMove"
      @touchend="canvasLeave"
    >抱歉，您的浏览器不支持canvas元素</canvas>
    
      <!-- @mousedown="canvasDown($event)"
      @mousemove="canvasMove($event)"
      @mouseup="canvasUp"
      @mouseleave="canvasLeave" -->
    <!-- <span class="mt-a" @click="clear">清除</span>
    <span class="mt-b" @click="getPic">确认</span> -->
  </div>
  <!-- <div @click="download" v-if="imgSrc" class="save">下载图片</div> -->
</template>

<script>
export default {
  props: {
    width: { type: String, default: "250" },
    height: { type: String, default: "300" }
  },
  data() {
    return {
      ctx: null,
      canvasMoveUse: false,
      imgSrc: ''
    }
  },
  mounted() {
    this.ctx = this.$refs.myCanvas.getContext("2d")
    this.ctx.lineWidth = 5;
  },
  methods: {
    clear() {
      this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
      this.imgSrc = '';
    },
    getPic(){
      let base64Img = this.$refs.myCanvas.toDataURL("image/png"); // png | jpeg | webp
      this.imgSrc = base64Img
      return base64Img
    },
    download() {
      let elA = document.createElement('a')
      elA.download = ''; // 设置下载的文件名，默认是“下载”
      elA.href = this.imgSrc;
      document.body.appendChild(elA);
      elA.click();
      elA.remove(); // 下载之后把创建的元素删除
      this.imgSrc = '';
    },
    canvasDown(e){
      this.canvasMoveUse = true;
      const target = e.target.offsetParent
      const canvasX = e.touches[0].clientX - target.offsetLeft ;
      const canvasY = e.touches[0].clientY - target.offsetTop - 100;
      this.ctx.beginPath(); // 移动的起点
      this.ctx.moveTo(canvasX, canvasY);
    },
    canvasMove(e){
      if(this.canvasMoveUse) {
      const target = e.target.offsetParent
      const canvasX = e.touches[0].clientX - target.offsetLeft;
      const canvasY = e.touches[0].clientY - target.offsetTop - 100;
      this.ctx.lineTo(canvasX, canvasY);
      this.ctx.stroke()
      }
    },
    canvasUp() {
      this.canvasMoveUse = false;
    },
    canvasLeave() {
      this.canvasMoveUse = false;
    }
  }
  // setup() {
  //   const myCanvas = ref(null);
  //   const data = reactive({
  //     ctx: null,
  //     canvasMoveUse: false,
  //     imgSrc: ''
  //   })

  //   const clear = () => {
  //     data.ctx.clearRect(0, 0, data.ctx.canvas.width, data.ctx.canvas.height);
  //     data.imgSrc = '';
  //   }
  //   const getPic = () => {
  //     let base64Img = myCanvas.value.toDataURL("image/png"); // png | jpeg | webp
  //     data.imgSrc = base64Img
  //     return base64Img
  //   }
  //   const download = () => {
  //     let elA = document.createElement('a')
  //     elA.download = ''; // 设置下载的文件名，默认是“下载”
  //     elA.href = data.imgSrc;
  //     document.body.appendChild(elA);
  //     elA.click();
  //     elA.remove(); // 下载之后把创建的元素删除
  //     data.imgSrc = '';
  //   }
  //   const canvasDown = e => {
  //     data.canvasMoveUse = true;
  //     const canvasX = e.offsetX;
  //     const canvasY = e.offsetY;
  //     data.ctx.beginPath(); // 移动的起点
  //     data.ctx.moveTo(canvasX, canvasY);
  //   }
  //   const canvasMove = e => {
  //     if(data.canvasMoveUse) {
  //       let canvasX = e.offsetX;
  //       let canvasY = e.offsetY;
  //       data.ctx.lineTo(canvasX, canvasY);
  //       data.ctx.stroke()
  //     }
  //   }
  //   const canvasUp = () => {
  //     data.canvasMoveUse = false;
  //   }
  //   const canvasLeave = () => {
  //     data.canvasMoveUse = false;
  //   }

  //   onMounted(() => {
  //     data.ctx = myCanvas.value.getContext("2d")
  //     data.ctx.lineWidth = 5;
  //   })

  //   return {
  //     ...toRefs(data),
  //     myCanvas,
  //     clear,
  //     getPic,
  //     download,
  //     canvasDown,
  //     canvasMove,
  //     canvasUp,
  //     canvasLeave
  //   }
  // },
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
