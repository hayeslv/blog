<!--
 * @Author: Lvhz
 * @Date: 2021-11-25 10:02:01
 * @Description: Description
-->
<template>
  <div>
    <a-button @click="uploadHandler">上传</a-button>
  </div>
</template>

<script>
import { aliOssConfig } from '@/config/config.default'
import OSS from 'ali-oss'
import { onMounted } from 'vue';
import request from '@/utils/request/index.ts'
export default {
  setup() {
    const uploadHandler = () => {
      const upload = () => {
        const inputObj = document.createElement('input')
        inputObj.setAttribute('id', 'file')
        inputObj.setAttribute('type', 'file')
        inputObj.setAttribute('name', 'file')
        inputObj.setAttribute("style", 'visibility:hidden')
        document.body.appendChild(inputObj)
        inputObj.click()
      }
      upload()
      document.querySelector('#file').addEventListener('change', async e => {
        const file = e.target.files && e.target.files[0]
        if (!file) return

        const client = new OSS(aliOssConfig)

        async function put() {
          try {
            // object表示上传到OSS的文件名称。
            // file表示浏览器中需要上传的文件，支持HTML5 file和Blob类型。
            const r1 = await client.put('markdown/object', file)
            console.log('put success: %j', r1);
            const r2 = await client.get('markdown/object');
            console.log('get success: %j', r2);
          } catch(e) {
            console.error('error：', e);
          }
        }

        put(); 
      })

      
      
    }

    onMounted(() => {
      request.post('http://localhost:7011/api/test/testget', {name: 'dylan'})
    })

    return { uploadHandler }
  }
};
</script>

<style lang="scss" scoped>

</style>
