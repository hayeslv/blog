<!--
 * @Author: Lvhz
 * @Date: 2021-04-13 10:55:07
 * @Description: 
-->
<template>
  <div class="column">
    <PanelBac title="其他图 2" :height="210">
      <div ref="charts" class="canvas"></div>
    </PanelBac>
  </div>
</template>

<script>
import echarts from 'echarts';
import 'echarts-wordcloud';
import { getOption } from './echart.config.js';
import { OtherApi } from '@api';
export default {
  data() {
    return {
      myChart: null,
      dataList: []
    };
  },
  watch: {
    // 每当数据发送变化时，重新进行图表渲染
    dataList() {
      this.echartRender();
    }
  },
  mounted() {
    this.myChart = echarts.init(this.$refs.charts);
    this.initData();
    // 添加点击事件
    this.myChart.on('click', function(params) {
      console.log(params);
    });
  },
  beforeDestroy() {
    this.myChart && this.myChart.dispose();
  },
  methods: {
    initData() {
      this.getEchartData();
    },
    async getEchartData() {
      try {
        const res = await OtherApi.getOther_2_data();
        this.dataList = res.data || [];
      } catch (error) {
        throw new Error(error);
      }
      this.echartRender();
    },
    echartRender() {
      if (this.myChart) this.clearEchart();

      this.myChart = echarts.init(this.$refs.charts);
      const option = getOption(this.dataList);
      this.myChart.setOption(option);
    },
    // 清理echart
    clearEchart() {
      this.myChart && this.myChart.dispose();
      this.myChart = null;
    }
  }
};
</script>

<style lang="scss" scoped>
.canvas{
  width: 100%;
  height: 150px;
  color: rgb(0, 204, 255);
}
</style>
