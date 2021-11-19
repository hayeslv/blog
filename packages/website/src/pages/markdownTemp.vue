<!--
 * @Author: Lvhz
 * @Date: 2021-11-02 16:36:23
 * @Description: Description
-->

<script>
import { useRoute } from "vue-router";
import { toRaw, ref } from "vue";
import marked from "marked";
export default {
  setup() {
    const route = useRoute();
    // const navs = toRaw(route).path.value;
    // const length = navs.split("/").length;
    // 获取文件名（路由名）
    // const nav = navs.split("/")[length - 1];

    // 获取文件路径
    const filePath = toRaw(route).meta.value.filePath;
    // const markdown = require(`@/${filePath}/${nav}.md`);
    const markdown = require(`@/${filePath}`);
    console.log(markdown.toString());
    const code = ref(marked(markdown));
    return { code };
  },
  render() {
    return <div class="markdown-body" innerHTML={this.code}></div>;
  },
};
</script>

<style lang="scss" scoped></style>
