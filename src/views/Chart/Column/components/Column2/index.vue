<!--
 * @Author: Lvhz
 * @Date: 2021-04-14 09:47:57
 * @Description: Description
-->
<template>
  <div class="column">
    <PanelBac title="柱状图 2">
      <template v-slot:selector>
        <el-select class="selector" v-model="selectVal" placeholder="请选择">
          <el-option v-for="item in optionList" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </template>
      <div ref="charts" class="canvas"></div>
    </PanelBac>
  </div>
</template>

<script>
import * as echarts from 'echarts';
import { getOption } from './echart.config';
// import { ColumnApi } from '@api';
export default {
  data() {
    return {
      myChart: null,
      dataList: [],
      optionList: [
        { value: 1, label: '株洲大桥' },
        { value: 2, label: '石峰大桥' },
        { value: 3, label: '路口大桥' },
        { value: 4, label: '建宁大桥' },
      ],
      selectVal: ''
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
.selector{
  width: 120px;
}
</style>
<style>
.selector .el-input__inner {
  height: 30px;
  font-size: 12px;
  background: rgba(0, 23, 65, 0.3) !important;
  border: 1px solid rgba(251, 139, 21, 0.3);
  border-radius: 25px;
  box-shadow: 0px 0px 8px 0px rgba(251, 139, 21, 0.5) inset;
  color: #fdad43 !important;
}
.selector .el-input__suffix{
  display: flex;
  align-items: center;
}

.selector .el-popper[x-placement^='bottom'] .popper__arrow::after {
  border-bottom-color: rgba(0, 23, 65, 0.3) !important;
}

.selector .el-select-dropdown {
  background-color: rgba(0, 23, 65, 0.3);
  color: #fff !important;
}

.el-select-dropdown__item {
  color: #fff !important;
  background-color: rgba(0, 23, 65, 0.3) !important;
}

.el-select-dropdown__item:hover {
  color: #fdad43 !important;
}

.el-select-dropdown__item.selected {
  color: rgb(216, 184, 141) !important;
}

.el-select-dropdown__list {
  background: linear-gradient(180deg, rgba(0, 77, 179, 0.7) 1%, rgba(0, 35, 139, 0.7)) !important;
}

.el-select-dropdown {
  border: 0 !important;
}

.el-select-dropdown__item {
  text-align: center;
}
</style>
