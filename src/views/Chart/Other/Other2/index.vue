<!--
 * @Author: Lvhz
 * @Date: 2021-04-13 10:55:07
 * @Description: 
-->
<template>
  <div class="echart-wrap">
    <PanelBac title="其他图 2" :height="210">
      <div ref="chartsRef" class="canvas"></div>
    </PanelBac>
  </div>
</template>

<script>
import * as echarts from 'echarts';
import 'echarts-wordcloud';
import { getOption } from './echart.config';
import { ref, toRaw, watch, onMounted, onUnmounted } from 'vue'
// import { ColumnApi } from '@api';

const demoList = [
  { name: '抛洒滴漏', value: 333 },
  { name: '违法排污', value: 113 },
  { name: '违法广告', value: 234 },
  { name: '交通信号灯', value: 112 },
  { name: '渣土乱倒', value: 444 },
  { name: '垃圾满溢', value: 222 }
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
