<!--
 * @Author: Lvhz
 * @Date: 2021-04-13 10:55:07
 * @Description: 
-->
<template>
  <div class="echart-wrap">
    <PanelBac title="折线图 2" :height="210">
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
  { name: 0, value: 100 },
  { name: 1, value: 138 },
  { name: 2, value: 350 },
  { name: 3, value: 173 },
  { name: 4, value: 180 },
  { name: 5, value: 150 },
  { name: 6, value: 100 },
  { name: 7, value: 138 },
  { name: 8, value: 100 },
  { name: 9, value: 173 },
  { name: 10, value: 160 }
]
export default {
  name: "40901ae29b7d73ba0f75abcf05fcd97b",
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
