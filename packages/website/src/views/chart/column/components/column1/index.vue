<!--
 * @Author: Lvhz
 * @Date: 2021-04-13 10:55:07
 * @Description: 本年按时结案率
-->
<template>
  <div class="echart-wrap">
    <PanelBac title="柱状图 1">
      <template v-slot:selector>
        <Selector :list="['本月', '本年']" @change="selectorChange"></Selector>
      </template>
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
  { name: "天元区", value: 5000 },
  { name: "芦淞区", value: 2200 },
  { name: "荷塘区", value: 1000 },
  { name: "石峰区", value: 500 },
  { name: "云龙区", value: 1200 },
];
export default {
  name: "column1",
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
    const selectorChange = (index) => {
      getEchartData(index);
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

    return { chartsRef, selectorChange };
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
