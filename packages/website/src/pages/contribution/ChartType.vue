<!--
 * @Author: Lvhz
 * @Date: 2021-11-25 14:42:59
 * @Description: Description
-->
<template>
  <a-form class="a-form" :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol">
    <a-form-item label="图表类型">
      <a-radio-group v-model:value="formState.chartType">
        <a-radio :value="1">柱状图</a-radio>
        <a-radio :value="2">折线图</a-radio>
        <a-radio :value="3">饼图</a-radio>
        <a-radio :value="9">其他图</a-radio>
      </a-radio-group>
    </a-form-item>
  </a-form>
  
</template>

<script>
import { reactive } from 'vue';
export default {
  setup() {
    const formState = reactive({
      chartType: 1, // 1柱状图、2折线图、3饼图，9其他类型图
    });

    return {
      labelCol: { style: { width: "70px" } },
      wrapperCol: { span: 14 },
      formState,
    };
  }
};
</script>

<style lang="scss" scoped>

</style>
