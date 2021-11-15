<!--
 * @Author: Lvhz
 * @Date: 2021-04-13 10:55:07
 * @Description: 
-->
<template>
  <div class="echart-wrap">
    <PanelBac title="其他图 1" :height="210">
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
  { id: 1, temp: 25, date: '00时', standardNum: 200, noStandardNum: 155 },
  { id: 2, temp: 22, date: '01时', standardNum: 155, noStandardNum: 200 },
  { id: 3, temp: 26, date: '02时', standardNum: 352, noStandardNum: 3 },
  { id: 4, temp: 23, date: '03时', standardNum: 200, noStandardNum: 155 },
  { id: 5, temp: 20, date: '04时', standardNum: 352, noStandardNum: 3 },
  { id: 6, temp: 21, date: '05时', standardNum: 355, noStandardNum: 0 },
  { id: 7, temp: 25, date: '06时', standardNum: 300, noStandardNum: 55 },
  { id: 8, temp: 22, date: '07时', standardNum: 352, noStandardNum: 3 },
  { id: 9, temp: 26, date: '08时', standardNum: 354, noStandardNum: 1 },
  { id: 10, temp: 23, date: '09时', standardNum: 352, noStandardNum: 3 },
  { id: 11, temp: 20, date: '10时', standardNum: 355, noStandardNum: 40 },
  { id: 12, temp: 21, date: '11时', standardNum: 355, noStandardNum: 40 },
  { id: 13, temp: 25, date: '12时', standardNum: 350, noStandardNum: 5 },
  { id: 14, temp: 22, date: '13时', standardNum: 352, noStandardNum: 3 },
  { id: 15, temp: 26, date: '14时', standardNum: 354, noStandardNum: 1 },
  { id: 16, temp: 23, date: '15时', standardNum: 352, noStandardNum: 3 },
  { id: 17, temp: 25, date: '16时', standardNum: 355, noStandardNum: 50 },
  { id: 18, temp: 22, date: '17时', standardNum: 355, noStandardNum: 50 },
  { id: 19, temp: 26, date: '18时', standardNum: 355, noStandardNum: 50 },
  { id: 20, temp: 23, date: '19时', standardNum: 355, noStandardNum: 0 },
  { id: 21, temp: 20, date: '20时', standardNum: 350, noStandardNum: 5 },
  { id: 22, temp: 21, date: '21时', standardNum: 352, noStandardNum: 3 },
  { id: 23, temp: 25, date: '22时', standardNum: 354, noStandardNum: 1 },
  { id: 24, temp: 25, date: '23时', standardNum: 352, noStandardNum: 3 }
]
export default {
  name: "cfa5b808bdbabdc21510535cc5611f03",
  setup() {
    let myChart = null
    let chartsRef = ref()
    // let dataList = ref([])
    let dataList = ref(demoList.map(item => {
      return {
        name: item.date || '',
        lineVal: item.temp || 0,
        colVal1: item.standardNum || 0,
        colVal2: item.noStandardNum || 0
      }
    }))

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
