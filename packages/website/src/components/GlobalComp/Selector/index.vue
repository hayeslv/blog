<!--
 * @Author: Lvhz
 * @Date: 2021-04-14 15:09:52
 * @Description: Description
-->
<template>
  <div class="global-selector">
    <!-- <div class="global-select" :class="{active: activeIndex === 0}">
      <div class="inner">
        <img v-show="activeIndex === 0" :src="lightImgSrc" alt="">
        <span @click="changeActive(0)">本月</span>
      </div>
    </div>
    <div class="global-select" :class="{active: activeIndex === 1}">
      <div class="inner">
        <img v-show="activeIndex === 1" :src="lightImgSrc" alt="">
        <span @click="changeActive(1)">本年</span>
      </div>
    </div> -->
    <div
      v-for="(item, index) in list"
      :key="index"
      class="global-select"
      :class="{ active: activeIndex === index }"
    >
      <div class="inner">
        <img v-show="activeIndex === index" :src="lightImgSrc" alt="" />
        <span @click="changeActive(index)">{{ item }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Selector",
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      lightImgSrc: require("@image/common/select-light.png"),
      activeIndex: 0,
    };
  },
  methods: {
    changeActive(index) {
      if (this.activeIndex === index) return;
      this.activeIndex = index;
      this.$emit("change", index);
    },
  },
};
</script>

<style lang="scss" scoped>
.global-selector {
  display: flex;
  align-items: center;
  height: 28px;
  :first-of-type {
    border-radius: 6 0 0 6;
  }
  :last-of-type {
    border-radius: 0 6 6 0;
  }
}
.global-select {
  padding: 1px;
  background-color: #00385a;
  .inner {
    position: relative;
    height: 28px;
    line-height: 28px;
    background-color: rgba(0, 23, 65, 0.8);
    box-sizing: border-box;
    display: flex;
    align-items: center;
    img {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      transition-duration: 0.3s;
    }
    span {
      font-size: 12px;
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      height: 28px;
      line-height: 28px;
      padding: 0 18px;
      background: rgba(0, 23, 65, 0.8);
      color: rgba(255, 255, 255, 0.8);
      cursor: pointer;
      transition-duration: 0.3s;
    }
    span:hover {
      box-shadow: 0, 0, 8, 0, rgba(251, 139, 21, 0.5) inset;
    }
  }
}
.active {
  background-image: -webkit-linear-gradient(
    0deg,
    rgba(251, 139, 21, 0.6),
    #ffe95b 50%,
    rgba(251, 139, 21, 0.6)
  );
  .inner {
    span {
      color: #fdad43;
      box-shadow: 0, 0, 8, 0, rgba(251, 139, 21, 0.6) inset;
    }
  }
}
</style>
