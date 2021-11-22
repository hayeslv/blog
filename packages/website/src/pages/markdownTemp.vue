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
    const markdown = require(`@/${filePath}`);
    const code = ref(marked(markdown));
    
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
