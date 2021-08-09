<template>
  <div class="bg" @click="clickHandler" @mouseenter="mouseenterHandler" @mouseleave="mouseleaveHandler">
    <img :src="icon" alt="">
    <div class="title">{{ title }}</div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default() { return {}; }
    }
  },
  computed: {
    icon() {
      return this.data.icon || '';
    },
    title() {
      return this.data.title || '';
    }
  },
  methods: {
    clickHandler() {
      this.$emit('click', this.data);
    },
    mouseenterHandler() {
      this.$emit('mouseenter');
    },
    mouseleaveHandler() {
      this.$emit('mouseleave');
    }
  }
};
</script>

<style lang="scss" scoped>
.bg{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 600px;
  height: 600px;
  margin: 0 auto;
  background-repeat: no-repeat;
  background-image: url('./img/block-bg.png');
  background-position:0 0;
  animation-name: bgChange;
  animation-duration: 1s;
  animation-iteration-count: infinite;
  animation-timing-function: step-end;
  img{
    width: 160px;
    height: 160px;
  }
  .title{
    color: #fff;
    font-size: 32px;
  }
}
@keyframes bgChange{
  @for $i from 0 to 9 {
    #{$i * 10%} { background-position: -(ceil($i * 600px) % 4800) floor($i/8)*(-600px); }
  }
}
</style>
