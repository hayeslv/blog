<template>
  <div class="draggable">
    <video ref="video" src="./img/bg-video.mp4" autoplay="autoplay" loop="loop" muted="muted"></video>
    <div class="pic">
      <Block 
        v-for="item in pannelList" 
        :key="item.title" 
        class="block" 
        :data="item"
        @click="clickHandler"
        @mouseenter="mouseenterHandler"
        @mouseleave="mouseleaveHandler"
      ></Block>
    </div>
    <NavDetail v-if="isSelected" class="nav-detail" :list="navList" @click="navClickHandler"></NavDetail>
  </div>
</template>

<script>
import Block from './Block';
import NavDetail from './NavDetail';
import $ from 'jquery';
export default {
  components: { Block, NavDetail },
  data() {
    return {
      roY: 0, // y轴旋转角度
      rotateDeg: 0.8, // 每次旋转增加的角度
      isSelected: false, // 是否有面板被选中
      // 面板列表
      pannelList: [
        { index: 0, icon: require('./img/icon1.png'), title: '指挥协调' },
        { index: 1, icon: require('./img/icon2.png'), title: '业务指导' },
        { index: 2, icon: require('./img/icon3.png'), title: '公共服务' },
        { index: 3, icon: require('./img/icon4.png'), title: '数据汇集' }
      ],
      // 导航列表
      navList: [
        { id: 1, title: '广州市xxxxxxxxxxxxxx系统广州市xxxxxxxxxxxxxx系统广州市xxxxxxxxxxxxxx系统广州市xxxxxxxxxxxxxx系统' },
        { id: 2, title: '广州市xxxxxxxx系统' },
        { id: 3, title: '广州市xxxxxxxx系统' },
        { id: 4, title: '广州市xxxxxxxx系统' },
        { id: 5, title: '广州市xxxxxxxx系统' },
        { id: 6, title: '广州市xxxxxxxxxxxxxx系统' },
        { id: 7, title: '广州市xxxxxxxx系统' },
        { id: 8, title: '广州市xxxxxxxxxxxxxxxx系统广州市xxxxxxxxxxxxxxxx系统广州市xxxxxxxxxxxxxxxx系统' }
      ]
    };
  },
  mounted() {
    this.initEffect();
    this.$refs.video.play();
    this.autoPlay();
  },
  methods: {
    // 图片拖拽效果
    initEffect() {
      const that = this;
      var imgL = $('.pic .block').length;
      var deg = 360 / imgL;
      // var roY = 0;
      var xN = 0, yN = 0;
      var play = null;
      $('.pic .block').each(function(i) {
        // translateZ 定义2d旋转沿着z轴（间隔宽度）
        $(this).css({ 'transform': 'rotateY(' + i * deg + 'deg) translateZ(500px)' });
        // 防止图片被拖拽
        $(this).attr('ondragstart', 'return false');
      });
      
      $(document).mousedown(function(ev) {
        var x_ = ev.clientX;
        var y_ = ev.clientY;
        clearInterval(play);
        $(this).bind('mousemove', function(ev) {
          /*获取当前鼠标的坐标*/
          var x = ev.clientX;
          var y = ev.clientY;
          /*两次坐标之间的距离*/
          xN = x - x_;
          yN = y - y_;

          that.roY += xN * 0.2;
          $('.pic').css({
            transform: 'scale(0.5) perspective(1500px) rotateX(-15deg) rotateY(' + that.roY + 'deg)'
          });
          /*之前的鼠标坐标*/
          x_ = ev.clientX;
          y_ = ev.clientY;

        });
      }).mouseup(function() {
        $(this).unbind('mousemove');
        var play = setInterval(function() {
        
          xN *= 0.95;
          yN *= 0.95;
          if (Math.abs(xN) < 1 && Math.abs(yN) < 1) {
            clearInterval(play);
          }
          that.roY += xN * 0.2;
          $('.pic').css({
            transform: 'scale(0.5) perspective(1500px) rotateX(-15deg) rotateY(' + that.roY + 'deg)'
          });
        }, 30);
      });
    },
    // 自动转动
    autoPlay() {
      this.timer = setInterval(() => {
        // this.xN *= 0.95;
        this.roY += this.rotateDeg;
        if (this.roY > 360) {
          this.roY = this.roY % 360;
        }
        $('.pic').css({
          transform: 'scale(0.5) perspective(1500px) rotateX(-15deg) rotateY(' + this.roY + 'deg)'
        });
      }, 30);
    },
    // 清除定时器（取消自动转动）
    stopAutoPlay() {
      clearInterval(this.timer);
      this.timer = null;
    },
    // 鼠标移入
    mouseenterHandler() {
      this.stopAutoPlay();
    },
    // 鼠标移出
    mouseleaveHandler() {
      !this.isSelected && this.autoPlay();
    },
    // 面板点击事件
    clickHandler(data) {
      this.stopAutoPlay();
      this.isSelected = true;
      // ! 根据data内容更新 this.navList

      this.adjustRotateY(data.index || 0);
    },
    // 调整rotateY角度，使其变为整值（依据面板数量而定）
    adjustRotateY(index) {
      const length = this.pannelList.length;
      const angle = 360 / length; // 每个面板占据的角度
      this.roY = -angle * index;
    },
    // 导航点击
    navClickHandler(item) {
      console.log(item);
    }
  }
};
</script>

<style lang="scss" scoped>
.draggable{
  position: relative;
  width: 1200px;
  height: 800px;
  video{
    width: 100%;
    height: 100%;
  }
}
.pic{
  position: absolute;
  left: 25%;
  top: 10%;
  width: 600px;
  height: 600px;
  /*transform 旋转元素*/
  transform-style: preserve-3d;
  // 整体初始化角度
  transform: scale(0.5) perspective(1500px) rotateX(-15deg) rotateY(0deg);
}

.pic .block{
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 5px;
  cursor: pointer;
  // box-shadow: 0px 0px 10px #fff;
  /*倒影的设置*/
  // -webkit-box-reflect:below 10px -webkit-linear-gradient(top,rgba(0,0,0,0) 50%,rgba(0,0,0,.5) 100%);
}
.nav-detail{
  position: absolute;
  bottom: 50px;
  left: 0;
  width: 1200px;
  height: 150px;
}
</style>
