<!--
 * @Author: Lvhz
 * @Date: 2021-04-13 10:55:07
 * @Description: 
-->
<template>
  <div class="echart-wrap">
    <PanelBac title="折线图 1" :loading="loading" :isEmpty="isEmpty">
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
  { name: 0, value1: 100, value2: 50, value3: 233 },
  { name: 1, value1: 138, value2: 50, value3: 10 },
  { name: 2, value1: 350, value2: 60, value3: 20 },
  { name: 3, value1: 173, value2: 70, value3: 12 },
  { name: 4, value1: 180, value2: 80, value3: 13 },
  { name: 5, value1: 150, value2: 90, value3: 50 },
  { name: 6, value1: 178, value2: 30, value3: 70 },
  { name: 7, value1: 100, value2: 40, value3: 50 },
  { name: 8, value1: 138, value2: 50, value3: 40 },
  { name: 9, value1: 350, value2: 60, value3: 60 },
  { name: 10, value1: 180, value2: 60, value3: 100 },
  { name: 11, value1: 233, value2: 70, value3: 200 },
]

//! 是否打开loading调试
const openLoading = false

export default {
  setup() {
    let myChart = null
    let chartsRef = ref()
    let loading = ref(false)
    let isEmpty = ref(false)
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
      
      if(openLoading) {
        //! 模拟接口调用
        setTimeout(() => {
          loading.value = true
        }, 0);

        setTimeout(() => {

          if(Math.random() > 0.5) {
            loading.value = false
            isEmpty.value = true
          } else {
            loading.value = false
            isEmpty.value = false

            echartRender(); // 渲染
          }
          
        }, 2000)
      } else {
        echartRender(); // 渲染
      }
      

      
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

    return { chartsRef, selectorChange, loading, isEmpty }
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
