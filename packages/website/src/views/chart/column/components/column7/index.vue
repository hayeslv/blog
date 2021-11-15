<!--
 * @Author: Lvhz
 * @Date: 2021-04-13 10:55:07
 * @Description: 本年按时结案率
-->
<template>
  <div class="echart-wrap">
    <PanelBac title="柱状图 7">
      <div ref="chartsRef" class="canvas"></div>
    </PanelBac>
  </div>
</template>

<script>
import * as echarts from "echarts";
import { getOption } from "./echart.config";
import { ref, toRaw, watch, onMounted, onUnmounted } from "vue";
// import { ColumnApi } from '@api';

const demoList = [
  { name: "星期一", value: 80 },
  { name: "星期二", value: 80 },
  { name: "星期三", value: 97 },
  { name: "星期四", value: 53 },
  { name: "星期五", value: 95 },
  { name: "星期六", value: 26 },
  { name: "星期天", value: 72 },
];
export default {
  name: "b4bd03cdc3a0480007240e217d43e856",
  setup() {
    let myChart = null;
    let chartsRef = ref();
    // let dataList = ref([])
    let dataList = ref(demoList);

    const initData = () => {
      getEchartData();
    };
    const getEchartData = async () => {
      // 接口调用
      // try {
      //   const res = await ColumnApi.getColumn_1_data();
      //   dataList.value = res.data || [];
      // } catch (error) {
      //   throw new Error(error);
      // }
      echartRender();
    };
    const echartRender = () => {
      if (myChart) clearEchart();
      myChart = echarts.init(chartsRef.value);
      const option = getOption(toRaw(dataList.value));
      myChart.setOption(option);
    };
    const clearEchart = () => {
      myChart && myChart.dispose();
      myChart = null;
    };
    watch(dataList, () => {
      echartRender();
    });

    onMounted(() => {
      initData();
    });
    onUnmounted(() => {
      myChart && myChart.dispose();
    });

    return { chartsRef };
  },
};
</script>

<style lang="scss" scoped>
.echart-wrap {
  color: #fff;
}
.canvas {
  width: 100%;
  height: 150px;
}
</style>
