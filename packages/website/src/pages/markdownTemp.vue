<!--
 * @Author: Lvhz
 * @Date: 2021-11-02 16:36:23
 * @Description: Description
-->

<script>
import { useRoute } from "vue-router";
import { toRaw, ref, watch } from "vue";
import marked from "marked";
import Prism from "prismjs";
import { nextTick } from 'process';

export default {
  setup() {
    const route = useRoute();

    // 获取文件路径
    const filePath = toRaw(route).meta.value.filePath;

    // !test
    let code = ref('');

    // if(filePath === 'algorithm/array/leetcode53-最大子序和.md') {
    //   fetch("https://dylan-static.oss-cn-beijing.aliyuncs.com/markdown/algorithm/linklist/leetcode142-%E7%8E%AF%E5%BD%A2%E9%93%BE%E8%A1%A8%E2%85%A1.md")
    //     .then(response => response.text())
    //     .then(text => {
    //       console.log(text);
    //       code.value = marked(text)
    //     })
    // } else {
    //   const markdown = require(`@/${filePath}`);
    //   code.value = marked(markdown)
    // }

    const markdown = require(`@/${filePath}`);
    code.value = marked(markdown)
    
    
    watch(route, () => {
      nextTick(() => {
        Prism.highlightAll()
      })
    })
    return { code };
  },
  render() {
    return <div class="markdown-body" innerHTML={this.code}></div>;
  },
};
</script>

<style lang="scss" scoped></style>
