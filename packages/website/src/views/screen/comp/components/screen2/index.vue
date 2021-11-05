<!--
 * @Author: Lvhz
 * @Date: 2021-10-13 14:54:00
 * @Description: Description
-->
<template>
  <div class="echart-wrap">
    <PanelBac title="指标" :height="210">
      <div class="wrap">
        <div class="block">
          <span>{{ objData.gridNum }}</span>
          <span>网格数</span>
        </div>
        <div class="block">
          <span>{{ objData.areaNum }}<i>k㎡</i></span>
          <span>覆盖面积</span>
        </div>
        <div class="block">
          <span>{{ objData.collectorNum }}</span>
          <span>采集员</span>
        </div>
      </div>
    </PanelBac>
  </div>
</template>

<script>
import { reactive } from 'vue'
// import { ColumnApi } from '@api';

export default {
  setup() {
    let objData = reactive({
      gridNum: 0,
      areaNum: 0,
      collectorNum: 0
    })

    const getData = () => {
      // 接口调用
      objData.gridNum = 152;
      objData.areaNum = 282.18;
      objData.collectorNum = 145;
    }

    getData()

    return { objData }
  },
};
</script>

<style lang="scss" scoped>
.echart-wrap{
  color: #fff;
}
.wrap{
  margin-top: 50px;
  display: flex;
  justify-content: space-between;
  padding: 6px 54px;
}
.block{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  i{
    font-style: normal;
  }
  span:nth-of-type(1){
    color: #FDAD43;
    font-weight: bold;
    font-size: 24px;
    i{
      font-size: 14px;
      color: rgba(255,255,255,0.8);
      margin-left: 4px;
    }
  }
  span:nth-of-type(2){
    font-size: 14px;
    color: rgba(255,255,255,0.8);
  }
}
.unit{
  margin-left: 4px;
}
</style>
