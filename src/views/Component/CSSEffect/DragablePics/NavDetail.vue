<template>
  <div class="nav-detail">
    <img class="bg-outer" :src="navLineBg" alt="">
    <img class="bg-inner" :src="navLineBg" alt="">
    <div class="content">
      <div v-for="item in list" :key="item.id" class="nav-block" @click="clickHandler(item)">
        <span></span>
        <span>{{ item.title }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default() { return []; }
    }
  },
  data() {
    return {
      navLineBg: require('./img/detail-bg.png')
    };
  },
  methods: {
    clickHandler(item) {
      this.$emit('click', item);
    }
  }
};
</script>

<style lang="scss" scoped>
.nav-detail{
  img{
    position: absolute;
  }
  .bg-outer{
    width: 100%;
    height: 100%;
  }
  .bg-inner{
    width: 98%;
    height: 86%;
    left: 50%;
    bottom: 10px;
    transform: translateX(-50%);
  }
}
.content{
  position: absolute;
  left: 0;
  bottom: 0;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  flex-wrap: wrap;
  color: #89EBFF;
  box-sizing: border-box;
  padding: 44px 60px;
  .nav-block{
    display: flex;
    align-items: center;
    width: 25%;
    cursor: pointer;
    span:nth-of-type(1){
      width: 14px;
      height: 14px;
      border-radius: 50%;
      background-color: #89EBFF;
      margin: 0 10px;
    }
    span:nth-of-type(2){
      flex: 1;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
}
</style>
