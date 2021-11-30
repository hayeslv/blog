<!--
 * @Author: Lvhz
 * @Date: 2021-11-25 14:42:59
 * @Description: Description
-->
<template>
  <a-form class="a-form" :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol">
    <a-form-item label="文章类型">
      <a-radio-group v-model:value="formState.type">
        <a-radio value="algorithm">算法</a-radio>
        <a-radio value="plugin">插件使用</a-radio>
        <a-radio value="server">服务器</a-radio>
      </a-radio-group>
    </a-form-item>
    <a-form-item label="文章标题">
      <a-input v-model:value="formState.name" />
    </a-form-item>
    <a-form-item label="文章路由">
      <a-input v-model:value="formState.nav" />
    </a-form-item>
  </a-form>
  
</template>

<script>
import { reactive } from 'vue';
export default {
  setup() {
    const formState = reactive({
      type: 'algorithm', // 算法
      name: '',
      nav: ''
    });

    const getFormData = () => {
      return formState
    }

    return {
      labelCol: { style: { width: "70px" } },
      wrapperCol: { span: 14 },
      formState,
      getFormData
    };
  }
};
</script>

<style lang="scss" scoped>

</style>
