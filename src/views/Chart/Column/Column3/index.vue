<!--
 * @Author: Lvhz
 * @Date: 2021-04-14 09:47:57
 * @Description: 解决柱状图渐变时，legend也会变成渐变的问题
-->
<template>
  <div class="column">
    <PanelBac title="柱状图 3" :height="210">
      <div ref="charts" class="canvas"></div>
    </PanelBac>
  </div>
</template>

<script>
import * as echarts from 'echarts';
import { getOption } from './echart.config.js';
import { ColumnApi } from '@api';
export default {
  data() {
    return {
      myChart: null,
      dataList: []
    };
  },
  watch: {
    dataList() {
      this.echartRender();
    }
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
      try {
        const res = await ColumnApi.getColumn_3_data();
        this.dataList = res.data || [];
      } catch (error) {
        throw new Error(error);
      }
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
    }
  }
};
</script>

<style lang="scss" scoped>
.column{
  color: #fff;
}
.canvas{
  width: 100%;
  height: 150px;
}
</style>
