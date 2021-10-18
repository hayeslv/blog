<!--
 * @Author: Lvhz
 * @Date: 2021-04-13 10:55:07
 * @Description: 本年按时结案率
-->
<template>
  <div class="echart-wrap">
    <PanelBac title="柱状图 5" :height="210">
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
  { number: 484, totalNum: 513, name: '市辖区' },
  { number: 497, totalNum: 593, name: '荷塘区' },
  { number: 499, totalNum: 637, name: '芦淞区' },
  { number: 484, totalNum: 563, name: '石峰区' },
  { number: 481, totalNum: 556, name: '天元区' },
  { number: 488, totalNum: 512, name: '渌口区' },
  { number: 494, totalNum: 520, name: '攸县' },
  { number: 490, totalNum: 647, name: '茶陵县' },
  { number: 493, totalNum: 560, name: '炎陵县' },
  { number: 498, totalNum: 632, name: '云龙示范区' },
  { number: 481, totalNum: 595, name: '醴陵市' }
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
