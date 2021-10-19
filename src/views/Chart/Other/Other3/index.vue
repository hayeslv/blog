<!--
 * @Author: Lvhz
 * @Date: 2021-04-13 10:55:07
 * @Description: 词云图： highcharts
-->
<template>
  <div class="echart-wrap">
    <PanelBac title="highchart词云图">
      <div id="highCharts" class="canvas" />
    </PanelBac>
  </div>
</template>

<script>
import Highcharts from 'highcharts/highcharts';
import wordcloud from 'highcharts/modules/wordcloud';
// import { getOption } from './echart.config';
import { ref, watch, onMounted, onUnmounted } from 'vue'
// import { ColumnApi } from '@api';

wordcloud(Highcharts);
const demoList = [
  { name: '违贴牌匾', value: 552 },
  { name: '建宁驿查', value: 938 },
  { name: '非法张贴告', value: 1072 },
  { name: '暴露垃圾', value: 1797 },
  { name: '乱堆物堆料', value: 1999 },
  { name: '机动停放', value: 2851 }
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
      Highcharts.chart('highCharts', {
            // 关闭Highcharts右下方logo
            credits: { enabled: false },

            tooltip: { enabled: false },
            chart: {
              margin: [0, 0, 0, 0],
              // spacingBottom: 15,
              // spacingTop: 12,
              // spacingLeft: 5,
              // spacingRight: 5,
              // height: 210,
              // width: 450,
              backgroundColor: '#00225c',
            },
            series: [
              {
                // 把字摆正
                // rotation: {
                //   from: 0,
                //   to: 0,
                //   orientations: 2,
                // },
                type: 'wordcloud',
                // minFontSize: 14, // 最小字体
                // maxFontSize: 20, // 最大字体
                data:
                  demoList && demoList.length
                    ? demoList.map((item) => ({
                      name: item.name,
                      weight: item.value + 10000,
                      value: item.value,
                      // value: Math.floor(Math.random() * 1000 + 1),
                    }))
                    : [],
              },
            ],
            // 点击事件方法
            plotOptions: {
              series: {
                cursor: 'pointer',
                events: {
                  click(e) {
                    // 单条数据
                    console.log(e.point.options.itemData);
                  },
                },
              },
            },
            title: {
              text: '',
            },
          });
      // if (myChart) clearEchart();
      // myChart = echarts.init(chartsRef.value);
      // const option = getOption(toRaw(dataList.value));
      // myChart.setOption(option);
    }
    // const clearEchart = () => {
    //   myChart && myChart.dispose();
    //   myChart = null;
    // }

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
