<!--
 * @Author: Lvhz
 * @Date: 2021-10-21 17:33:07
 * @Description: Description
-->
<template>
  <div class="echart-wrap">
    <PanelBac title="滚动导航" width="100%" :height="210">
      <div class="bottom-nav">
        <div
          class="nav-wrap"
          :style="{
            transform: `translateX(-${xPoint}px)`,
            'transition-duration': isOpenTransform ? '0.3s' : '0s',
          }"
        >
          <div
            v-for="(nav, index) in navs"
            :key="index"
            class="scroll-bottom-nav"
            :class="{ active: curIndex === index }"
            @click="routeTo(nav.name, index)"
          >
            {{ nav.label }}
            <div
              class="triangle"
              :class="{
                isshow: $route.name === nav.name && curIndex === index,
              }"
            />
            <div class="triangle" :class="{ isshow: curIndex === index }" />
          </div>
        </div>
      </div>
    </PanelBac>
  </div>
</template>

<script>
export default {
  data() {
    return {
      maxLenth: 0, // 总路由长度
      isOpenTransform: true, // 是否开启滚动动画
      curIndex: 0,
      everWidth: 0, // 每个nav的宽度 170
      xPoint: 0,
      isRunning: false, // 动画是否正在持续
      time: 300, // 动画持续时间
      navs: [
        { label: "综合概览", name: "comprehensive-overview" },
        { label: "数字城管专题", name: "digital-urban" },
        { label: "广告管理专题", name: "ad-manage" },
        { label: "智慧照明专题", name: "intelligent-light" },
        { label: "垃圾分类专题", name: "rubbish-classify" },
        { label: "综合执法专题", name: "comprehensive-enforcement" },
        { label: "园林绿化专题", name: "landscaping" },
        { label: "市容环卫专题", name: "city-appearance-env" },
      ],
    };
  },
  mounted() {
    const navList = document.getElementsByClassName("scroll-bottom-nav");
    this.everWidth = navList[0].clientWidth; // 动态获取每个nav的宽度

    this.maxLenth = this.navs.length || 0;
    this.navs = this.navs.concat(this.navs).concat(this.navs);
    this.curIndex = this.maxLenth || 0; // 当前位置

    // 可视区总宽度
    const totalWidth =
      document.getElementsByClassName("bottom-nav")[0].clientWidth;

    // 1、先向左移动一段完整的长度（总共三段），此时第一项应该是顶在起始位置的
    // 2、再向右移动可视区宽度的一半，此时第一项应该是顶在half后面的
    // 3、最后向左移动block的一半，使其整体居中
    this.xPoint =
      this.everWidth * this.curIndex - totalWidth / 2 + this.everWidth / 2;
  },
  methods: {
    routeTo(val, index) {
      if (this.isRunning) return;
      this.cssTransform(index);
    },
    // 动画持续期间，无法进行点击操作
    banClickHandler() {
      this.isRunning = true;
      setTimeout(() => {
        this.isRunning = false;
      }, this.time);
    },
    cssTransform(index) {
      this.banClickHandler();
      //! 前后各备份一份 [] [实际所在区域] []，设为abc
      //! 到达a和c时，需要回到b

      const changeIndex = this.curIndex - index;
      this.xPoint = this.xPoint - this.everWidth * changeIndex;
      this.curIndex = index;

      // 到达a时
      if (index < this.maxLenth) {
        index = index + this.maxLenth;
        setTimeout(() => {
          this.isOpenTransform = false;
          this.curIndex = index;
          this.xPoint = this.xPoint + this.everWidth * this.maxLenth;
          setTimeout(() => {
            this.isOpenTransform = true;
          }, 50);
        }, this.time);
      }
      // 到达c时
      if (index > this.maxLenth * 2 - 1) {
        index = index - this.maxLenth;
        setTimeout(() => {
          this.isOpenTransform = false;
          this.curIndex = index;
          this.xPoint = this.xPoint - this.everWidth * this.maxLenth;
          setTimeout(() => {
            this.isOpenTransform = true;
          }, 50);
        }, this.time);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.wrap {
  color: #fff;
  width: 100%;
}
.bottom-nav {
  // width: 1200px;
  width: 800px;
  overflow: hidden;
  white-space: nowrap;
  padding-top: 50px;
  margin: 0 auto;
  .scroll-bottom-nav {
    height: 30px;
    width: 150px;
    line-height: 30px;
    font-size: 14px;
    color: #ffffff;
    display: inline-block;
    background-image: url("./assets/inactiveRoute.png");
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    text-align: center;
    position: relative;
    user-select: none;
    cursor: pointer;
    &.active {
      background-image: url("./assets/activeRoute.png");
      font-size: 16px;
      color: #fdad43;
      transform: translateY(-15px);
    }
    .nav-wrap {
      transform: translateX(0);
      transition-duration: 0.3s;
    }
  }
}
.triangle {
  display: none;
}

// .triangle:before,
.triangle:after {
  position: absolute;
  content: "";
  border-top: 10px transparent solid;
  border-left: 10px transparent solid;
  border-right: 10px transparent solid;
  border-bottom: 10px #fdad43 solid;
}

.triangle:before {
  border-bottom: 10px #fdad43 solid;
}

.triangle:after {
  top: 40px;
  /*覆盖并错开1px*/
  border-bottom: 10px #fdad43 solid;
}
.isshow {
  display: block;
}
</style>
