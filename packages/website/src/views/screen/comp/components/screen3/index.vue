<!--
 * @Author: Lvhz
 * @Date: 2021-10-13 14:54:00
 * @Description: Description
-->
<template>
  <div class="echart-wrap">
    <PanelBac title="列表" :height="210">
      <div class="rank">
        <div class="wrap">
          <div class="table-title row">
            <span>排名</span>
            <span>点位</span>
            <span>实时水位</span>
          </div>
          <div class="table-content">
            <div
              v-for="(item, index) in dataList"
              :key="index"
              class="table-row row"
              @click="listClick(item)"
            >
              <span>{{ index + 1 }}</span>
              <span>{{ item.name || "-" }}</span>
              <span>{{ item.depth || "0cm" }}</span>
            </div>
          </div>
        </div>
      </div>
    </PanelBac>
  </div>
</template>

<script>
import { ref } from "vue";
// import { ColumnApi } from '@api';

const demoDataList = [
  { name: "科苑路-广平大街", depth: "8.00cm" },
  { name: "清城行政服务中心北门", depth: "7.00cm" },
  { name: "天华大街-永大路", depth: "6.00cm" },
  { name: "天河西路-祥瑞大街", depth: "5.00cm" },
  { name: "玉林烤鸭店南侧", depth: "4.00cm" },
];

export default {
  setup() {
    const dataList = ref(demoDataList);

    return { dataList };
  },
};
</script>

<style lang="scss" scoped>
.wrap {
  color: #fff;
}
.rank {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 10px 20px;
}
.wrap {
  // 滚动条样式
  .table-content {
    height: 100px;
    overflow: scroll;
    overflow-x: hidden; // 隐藏下方滚动条
    transition-duration: 0.5s;
    &::-webkit-scrollbar {
      width: 4px;
      height: 120px;
      background: rgba(16, 78, 144, 0.52);
    }
    &::-webkit-scrollbar-thumb {
      width: 4px;
      height: 50px;
      background: #246eff;
      border-radius: 4px;
    }
  }
  .row {
    display: flex;
    align-items: center;
    span:nth-of-type(1) {
      flex: 1;
      text-align: center;
    }
    span:nth-of-type(2) {
      flex: 3;
    }
    span:nth-of-type(3) {
      flex: 1;
    }
  }
  .table-title {
    width: 100%;
    height: 28px;
    background: rgba(0, 133, 255, 0.42);
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 4px;
  }
  .table-row {
    width: 100%;
    height: 28px;
    span {
      font-size: 14px;
      color: #bbb;
    }
  }
  .table-row:nth-of-type(2n) {
    background: rgba(0, 133, 255, 0.14);
  }
}
</style>
