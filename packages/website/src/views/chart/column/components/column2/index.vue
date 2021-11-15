<!--
 * @Author: Lvhz
 * @Date: 2021-04-14 09:47:57
 * @Description: Description
-->
<template>
  <div class="echart-wrap">
    <PanelBac title="柱状图 2">
      <div ref="charts" class="canvas"></div>
    </PanelBac>
  </div>
</template>

<script>
import * as echarts from "echarts";
import { getOption } from "./echart.config";
// import { ColumnApi } from '@api';
export default {
  name: "de3d1945180c5b6528e3f63e68a118a2",
  data() {
    return {
      myChart: null,
      dataList: [],
      optionList: [
        { value: 1, label: "株洲大桥" },
        { value: 2, label: "石峰大桥" },
        { value: 3, label: "路口大桥" },
        { value: 4, label: "建宁大桥" },
      ],
      selectVal: "",
    };
  },
  watch: {
    dataList() {
      this.echartRender();
    },
  },
  mounted() {
    this.myChart = echarts.init(this.$refs.charts);
    this.initData();
  },
  beforeUnmount() {
    this.myChart && this.myChart.dispose();
  },
  methods: {
    initData() {
      this.getEchartData();
    },
    // 获取echart数据
    async getEchartData() {
      // try {
      //   const res = await ColumnApi.getColumn_2_data();
      //   this.dataList = res.data || [];
      // } catch (error) {
      //   throw new Error(error);
      // }
      this.echartRender();
    },
    echartRender() {
      this.myChart && this.clearColumnEchart();
      this.myChart = echarts.init(this.$refs.charts);
      const option = getOption(this.dataList);
      this.myChart.setOption(option);
    },
    // 清理echart
    clearColumnEchart() {
      this.myChart && this.myChart.dispose();
      this.myChart = null;
    },
    selectorChange(val) {
      console.log(val);
    },
  },
};
</script>

<style lang="scss" scoped>
.canvas {
  width: 100%;
  height: 150px;
}
</style>
