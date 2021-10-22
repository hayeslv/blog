<!--
 * @Author: Lvhz
 * @Date: 2021-04-12 17:41:55
 * @Description: 背景面板
-->
<template>
  <div class="panel-bac" :style="{height: useHeight ? useHeight : 'auto', width: width ? width : ''}">
    <div class="inner">
      <div class="top">
        <img :src="panelTitleImgSrc" alt="">
        <div class="top-content">
          <div class="title">{{ title }}</div>
          <slot name="selector"></slot>
        </div>
      </div>
      <div class="content">
        <!-- 加载中 -->
        <div v-show="loading" class="loading-wrapper">
          <div class="loading" />
        </div>
        <!-- 加载完成，并且没有数据 -->
        <div v-show="!loading && isEmpty" class="no-data">
          <div class="empty" />
          <span>暂无数据</span>
        </div>
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
    loading: {
      type: Boolean,
      default: false,
    },
    isEmpty: {
      type: Boolean,
      default: false,
    },
    height: {
      type: [String, Number],
      default: null
    },
    width: {
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
  width: calc(100% - 8px);
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
.content{
  position: relative;
  .loading-wrapper {
    height: calc(100% - 20px);
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background-color: rgba(0, 34, 92, 1);
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    .loading {
      width: 150px;
      height: 75px;
      background-image: url('~@/assets/image/common/loading.gif');
      background-position: center;
      background-repeat: no-repeat;
      background-size: contain;
    }
  }
}
.no-data {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  .empty {
    height: 48px;
    width: 72px;
    background-image: url('~@/assets/image/common/empty.png');
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    margin-bottom: 16px;
    opacity: 0.4;
  }

  & > * {
    line-height: 18px;
    font-size: 16px;
    color: #999;
  }
}
</style>
