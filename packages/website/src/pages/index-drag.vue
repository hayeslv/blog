<template>
  <div>
    <!-- 左侧组件列表 -->
    <div class="left">
      <div
        class="left-item"
        v-for="item in list1"
        :key="item.code"
        draggable="true"
        @dragstart="e => dragstart(e, item)"
        @dragend="dragend"
      >
        {{ item.name }}
      </div>
    </div>
    <!-- 画布区域 -->
    <div class="targetContent" ref="targetContent">
      <div
        class="item"
        v-for="item in list2"
        :key="item.id"
        :ref="item.id"
        :style="{
          top: `${item.top - 16}px`,
          left: `${item.left - 85}px`,
          'z-index': `${item.zIndex}`
        }"
        @mousedown="e => mousedown(e, item)"
      >
        <template v-if="item.code === 'MyInput'">
          <a-input></a-input>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
export default {
  data() {
    return {
      list1: [
        {
          code: "MyInput",
          name: "输入框",
          props: {}
        }
      ],
      list2: [],
      dragItem: null,
      moveItem: null
    };
  },
  methods: {
    dragstart(e, item) {
      this.dragItem = item;
      // 设置元素的放置行为——移动
      this.$refs.targetContent.addEventListener("dragenter", this.dragenter);
      // 在目标元素经过 必须要阻止默认行为 否则不能触发drop
      this.$refs.targetContent.addEventListener("dragover", this.dragover);
      // 离开目标元素时设置元素的放置行为——不能拖放
      this.$refs.targetContent.addEventListener("dragleave", this.dragleave);
      // 拖动元素在目标元素松手时添加元素到画布
      this.$refs.targetContent.addEventListener("drop", this.drop);
    },
    dragend() {
      this.$refs.targetContent.removeEventListener("dragenter", this.dragenter);
      this.$refs.targetContent.removeEventListener("dragover", this.dragover);
      this.$refs.targetContent.removeEventListener("dragleave", this.dragleave);
      this.$refs.targetContent.removeEventListener("drop", this.drop);
    },
    dragenter(e) {
      e.dataTransfer.dropEffect = "move";
    },
    dragover(e) {
      e.preventDefault();
    },
    dragleave(e) {
      e.dataTransfer.dropEffect = "none";
    },
    drop(e) {
      const { code } = this.dragItem;
      this.list2.push({
        top: e.offsetY,
        left: e.offsetX,
        zIndex: 1,
        code: code,
        id: Date.parse(new Date())
      });
      this.dragItem = null;
    },
    mousedown(e, item) {
      this.moveItem = item;
      document.addEventListener("mousemove", this.mousemove);
      document.addEventListener("mouseup", this.mouseup);
    },
    mousemove(e) {
      const _this = this;
      let { clientX, clientY } = e;
      const moveIdx = _.findIndex(this.list2, function(o) {
        return o.id === _this.moveItem.id;
      });
      let newList2 = _.cloneDeep(this.list2);
      newList2[moveIdx].top = clientY;
      newList2[moveIdx].left = clientX;
      this.list2 = newList2;
    },
    mouseup() {
      document.removeEventListener("mousemove", this.mousemove);
      document.removeEventListener("mouseup", this.mouseup);
    }
  }
};
</script>
<style lang="scss" scoped>
.left {
  padding: 10px;
  position: absolute;
  width: 270px;
  background: rgb(247, 202, 202);
  top: 0;
  bottom: 0;
  left: 0;
}
.left-item {
  height: 100px;
  line-height: 100px;
  background: #fff;
}
.targetContent {
  background: rgb(173, 244, 247);
  height: 100vh;
  padding: 0 270px;
}
.item {
  position: absolute;
}
</style>

