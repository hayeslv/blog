<!--
 * @Author: Lvhz
 * @Date: 2021-04-13 10:55:07
 * @Description: 
-->
<template>
  <div class="echart-wrap">
    <PanelBac title="饼图 7" :height="210">
      <div ref="chartsRef" class="canvas"></div>
    </PanelBac>
  </div>
</template>

<script>
import * as echarts from 'echarts';
import { getOption } from './echart.config';
import { ref, toRaw, watch, onMounted, onUnmounted } from 'vue'
// import { ColumnApi } from '@api';

const demoList = [
  { name: '餐厨车辆123123', value: 6543 },
  { name: '生活垃圾运输123123车', value: 7543 },
  { name: '清洗清扫车123', value: 4543 },
  { name: '渗滤液转运车123', value: 4543 },
]
export default {
  name: "f4738bb30301e8e60a37f360b27de2ed",
  setup() {
    let myChart = null
    let chartsRef = ref()
    // let dataList = ref([])
    let dataList = ref(demoList)

    const initData = () => {
      getEchartData()
    }
    const getEchartData = async () => {
      // 接口调用
      // try {
      //   const res = await ColumnApi.getColumn_1_data();
      //   dataList.value = res.data || [];
      // } catch (error) {
      //   throw new Error(error);
      // }
      echartRender();
    }
    const echartRender = () => {
      if (myChart) clearEchart();
      myChart = echarts.init(chartsRef.value);
      const option = getOption(toRaw(dataList.value));
      myChart.setOption(option);
    }
    const clearEchart = () => {
      myChart && myChart.dispose();
      myChart = null;
    }
    const selectorChange = (index) => {
      getEchartData(index)
    }

    watch(dataList, () => {
      echartRender()
    })

    onMounted(() => {
      initData();
    })
    onUnmounted(() => {
      myChart && myChart.dispose();
    })

    return { chartsRef, selectorChange }
  },
};
</script>

<style lang="scss" scoped>
.echart-wrap{
  color: #fff;
}
.canvas{
  width: 100%;
  height: 150px;
}
</style>
