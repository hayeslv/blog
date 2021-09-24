<!--
 * @Author: Lvhz
 * @Date: 2021-09-24 09:18:21
 * @Description: 电子签名
 npm install vue-esign --save
 import vueEsign from 'vue-esign'
  Vue.use(vueEsign)
-->
<template>
  <div>
    <Signature ref="signature" width="800" height="500"></Signature>
    <el-button @click="submitHandler">确认（获取base64）</el-button>
  </div>
</template>

<script>
import Signature from '@/components/Signature'
import { ref } from 'vue'
export default {
  components: { Signature },
  setup() {
    const signature = ref(null)

    const submitHandler = () => {
      console.log(signature.value.getPic());
    }

    return {
      signature,
      submitHandler
    };
  },
};
</script>

<style lang="scss" scoped>

</style>
