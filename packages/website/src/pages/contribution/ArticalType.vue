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
    <a-form-item label="文章分组">
      <a-select v-model:value="formState.groupId" @change="groupChange" style="width: 250px">
        <a-select-option v-for="item in groupList" :key="item.id" :value="item.id">{{ item.name }}</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="文章标题">
      <a-input v-model:value="formState.title" style="width: 250px" />
    </a-form-item>
    <a-form-item label="文章路由">
      <a-input v-model:value="formState.nav" style="width: 250px" />
    </a-form-item>
  </a-form>
  
</template>

<script>
import { onMounted, reactive, ref } from 'vue';
import {ArticleApi} from '@api';
export default {
  setup() {
    const formState = reactive({
      type: 'algorithm', // 算法
      groupId: '',
      groupName: null,
      title: '',
      nav: ''
    });
    const groupList = ref([])

    const getFormData = () => {
      return formState
    }

    const groupChange = () => {
      const selectItem = groupList.value.find(item => item.id === formState.groupId)
      formState.groupName = selectItem.value
    }

    onMounted(async () => {
      const groupRes = await ArticleApi.getArticleGroupList()
      const { data } = groupRes
      groupList.value = data || []
    })

    return {
      labelCol: { style: { width: "70px" } },
      wrapperCol: { span: 14 },
      formState,
      groupList,
      getFormData,
      groupChange
    };
  }
};
</script>

<style lang="scss" scoped>

</style>
