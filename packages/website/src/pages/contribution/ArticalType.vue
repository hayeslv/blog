<!--
 * @Author: Lvhz
 * @Date: 2021-11-25 14:42:59
 * @Description: Description
-->
<template>
  <a-form class="a-form" :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol">
    <a-form-item label="文章类型">
      <a-select v-model:value="formState.typeId" @change="articleTypeChange" placeholder="请选择" style="width: 250px">
        <a-select-option v-for="item in articleTypeList" :key="item.id" :value="item.id">{{ item.name }}</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="文章分组" v-if="groupList.length > 0">
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
import { getArticleTypeList, getArticleGroupList } from './api'
export default {
  setup() {
    const formState = reactive({
      typeId: undefined, // 算法
      typeCode: null,
      groupId: '',
      groupName: null,
      title: '',
      nav: ''
    });
    const articleTypeList = ref([])
    const groupList = ref([])

    const getFormData = () => {
      return formState
    }

    // 文章分组change
    const groupChange = () => {
      const selectItem = groupList.value.find(item => item.id === formState.groupId)
      formState.groupName = selectItem.value
    }
    // 文章类型change
    const articleTypeChange = async (typeId) => {
      const selectItem = articleTypeList.value.find(item => item.id === formState.typeId)
      formState.typeCode = selectItem.type
      // 获取当前类型下的分组
      groupList.value = await getArticleGroupList(typeId)
    }

    onMounted(async () => {
      // 获取全部文章类型
      articleTypeList.value = await getArticleTypeList()
    })

    return {
      labelCol: { style: { width: "70px" } },
      wrapperCol: { span: 14 },
      formState,
      articleTypeList,
      groupList,
      getFormData,
      groupChange,
      articleTypeChange
    };
  }
};
</script>

<style lang="scss" scoped>

</style>
