<!--
 * @Author: Lvhz
 * @Date: 2021-04-12 17:41:55
 * @Description: 背景面板
-->
<template>
  <div class="panel-bac" :style="{height: useHeight ? useHeight : 'auto'}">
    <div class="inner">
      <div class="top">
        <img :src="panelTitleImgSrc" alt="">
        <div class="top-content">
          <div class="title">{{ title }}</div>
          <slot name="selector"></slot>
        </div>
      </div>
      <div class="content">
        <slot></slot>
      </div>
      <div class="footer">
        <div class="footer-inner"></div>
      </div>
    </div>
  </div> 
</template>

<script>
export default {
  name: 'PanelBac',
  props: {
    title: {
      type: [String],
      default: ''
    },
    height: {
      type: [String, Number],
      default: null
    }
  },
  data() {
    return {
      panelTitleImgSrc: require('@image/common/panel-title.png')
    };
  },
  computed: {
    useHeight() {
      if (!this.height) return null;
      // return this.height * 100 / 1080 + 'vh';
      return this.height + 'px';
    }
  }
};
</script>

<style lang="scss" scoped>
.panel-bac{
  position: relative;
  display: inline-block;
  width: 450px;
  border-radius: 20px 0 20px 0;
  padding: 1px;
  padding-bottom: 0;
  box-sizing: border-box;
  background-image: -webkit-linear-gradient(0deg, rgba(255,255,255,0.2) , #30BAFF 20% , rgba(255,255,255,0.2));
  box-shadow: 0, 0, 10px, 6px, rgba(48,106,255,0.16);
}
.footer{
  position: absolute;
  left: 1px;
  bottom: 0;
  width: calc(100% - 5px);
  height: 10px;
  border-radius: 0 0 20px 0;
  padding-bottom: 1px;
  background-image: -webkit-linear-gradient(0deg, rgba(255,255,255,0.2) , #30BAFF 80% , rgba(255,255,255,0.2));
}
.footer-inner{
  width: 100%;
  height: 100%;
  background-color: rgba(0,34,92,1);
  box-sizing: border-box;
  border-radius: 0 0 20px 0;
}
.inner{
  width: 100%;
  height: 100%;
  background-color: rgba(0,34,92,1);
  box-sizing: border-box;
  border-radius: 20px 0 20px 0;
  padding-bottom: 10px;
}
.top{
  position: relative;
  img{
    width: 450px;
    height: 50px;
  }
  .top-content{
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    box-sizing: border-box;
    padding-right: 16px;
    height: 50px;
    line-height: 50px;
    font-size: 18px;
    .title{
      margin-left: 56px;
      font-family: titleFont;
    }
  }
}
</style>
