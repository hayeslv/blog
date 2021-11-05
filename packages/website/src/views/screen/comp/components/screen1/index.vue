<!--
 * @Author: Lvhz
 * @Date: 2021-04-13 10:55:07
 * @Description: 
-->
<template>
  <div class="echart-wrap">
    <PanelBac title="比例图" :height="210">
      <div class="bar-wrapper" >
        <div class="bar-title">
          <div class="title">
            <span class="type">事件数量</span>
            <span style="color: #26B3FF; font-weight: bold;">{{ eventNum }}</span>
            <span>{{ leftPercent || '-' }}</span>
          </div>
          <div class="title">
            <span class="type">部件数量</span>
            <span style="color: #11C372; font-weight: bold;">{{ partsNum }}</span>
            <span>{{ rightPercent || '-' }}</span>
          </div>
        </div>
        <div class="column">
          <div class="left" :style="leftStyle">
            <div class="bar" />
          </div>
          <div class="right" :style="rightStyle">
            <div class="bar" />
          </div>
        </div>
      </div>
    </PanelBac>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
// import { ColumnApi } from '@api';

export default {
  setup() {
    let eventNum = ref(0)
    let partsNum = ref(0)

    const leftPercent = computed(() => {
      const total = eventNum.value + partsNum.value;
      if(total === 0) return '50%'
      return `${Math.floor((eventNum.value / total) * 100)}%`;
    })
    const rightPercent = computed(() => {
      const total = eventNum.value + partsNum.value;
      if(total === 0) return '50%'
      return `${Math.ceil((partsNum.value / total) * 100)}%`;
    })
    const leftStyle = computed(() => {
      return { width: leftPercent.value }
    })
    const rightStyle = computed(() => {
      return { width: rightPercent.value }
    })

    const getData = () => {
      // 接口调用
      eventNum.value = 255096;
      partsNum.value = 29299;
    }

    getData()

    return { eventNum, partsNum, leftPercent, rightPercent, leftStyle, rightStyle }
  },
};
</script>

<style lang="scss" scoped>
.echart-wrap{
  color: #fff;
}
.bar-wrapper {
  padding-left: 5%;
  padding-right: 5%;
  padding-top: 50px;
  .bar-title {
    display: flex;
    justify-content: space-between;
  }
  .column{
    height: 8px;
    display: flex;
  }
  .left {
    .bar {
      height: 100%;
      background: linear-gradient(270deg, #00ccff, #009dff 100%, rgba(0, 103, 255, 0));
    }
  }
  .right {
    .bar {
      height: 100%;
      background: linear-gradient(90deg, #1dffad, #0b9671);
    }
  }

  .title {
    margin-bottom: 2px;
    white-space: nowrap;
    color: rgba(255,255,255,0.8);
    font-size: 16px;
    line-height: 19px;
    & > * {
      margin-right: 4px;
      &:last-child {
        margin-right: 0;
      }
    }
    .type {
      font-size: 12px;
      line-height: 17px;
    }
  }
}
</style>
