<!--
 * @Author: Lvhz
 * @Date: 2021-04-13 10:55:07
 * @Description: 本年按时结案率
-->
<template>
  <div class="echart-wrap">
    <PanelBac title="柱状图 6">
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
  // 日期、厨余垃圾、有害垃圾、可回收垃圾、其他垃圾
  { name: '2015', value1: 167.97, value2: 132.43, value3: 108.65, value4: 140.16 },
  { name: '2016', value1: 103.14, value2: 132.43, value3: 108.65, value4: 140.16 },
  { name: '2017', value1: 196.25, value2: 132.43, value3: 108.65, value4: 140.16 },
  { name: '2018', value1: 119.31, value2: 132.43, value3: 108.65, value4: 140.16 },
  { name: '2019', value1: 146.53, value2: 132.43, value3: 108.65, value4: 140.16 },
  { name: '2020', value1: 196.91, value2: 132.43, value3: 108.65, value4: 140.16 },
]
export default {
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
    watch(dataList, () => {
      echartRender()
    })

    onMounted(() => {
      initData();
    })
    onUnmounted(() => {
      myChart && myChart.dispose();
    })

    return { chartsRef }
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
