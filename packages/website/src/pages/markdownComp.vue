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
    const navs = toRaw(route).path.value;
    const length = navs.split("/").length;
    const nav = navs.split("/")[length - 1];
    console.log(nav);
    const markdown = require(`@/docs/${nav}.md`);
    const code = ref(marked(markdown));
    return { code };
  },
  render() {
    return <div innerHTML={this.code}></div>;
  },
};
</script>

<style lang="scss" scoped></style>
