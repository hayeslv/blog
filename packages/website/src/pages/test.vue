<!--
 * @Author: Lvhz
 * @Date: 2021-11-25 10:02:01
 * @Description: Description
-->
<template>
  <div>
    123123
  </div>
</template>

<script>
import Fetch from '@/utils/request/Fetch'
export default {
  setup() {
    const fetch = new Fetch('browser');
    const fetchInterceptor = fetch.interceptor

    fetchInterceptor.register({
      request: function(...request) {
        return request;
      },
      response: function(response) {
        console.log('response', response);
        return response;
      }
    })
    fetch.request('http://localhost:7011/api/article/getArticleType?name=1', {
      headers: new Headers({
        'content-type': 'application/json'
      })
    }).then(res => res.json())
      .then(res => console.log(res))
  }
};
</script>

<style lang="scss" scoped>

</style>
