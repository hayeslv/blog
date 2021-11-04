<!--
 * @Author: Lvhz
 * @Date: 2021-11-02 16:36:23
 * @Description: Description
-->

<script>
import { useRoute } from "vue-router";
import { toRaw, h } from "vue";

export default {
  setup() {
    const getAllComp = () => {
      const route = useRoute();
      const navs = toRaw(route).path.value;
      const length = navs.split("/").length;
      // 获取文件名（路由名）
      const nav = navs.split("/")[length - 1];

      // 获取文件路径
      const filePath = toRaw(route).meta.value.filePath;
      const { getComponent } = require(`@/${filePath}/${nav}/index.js`);
      return getComponent();
    };

    // 获取全部子组件
    return { components: getAllComp() };
  },
  render() {
    // 渲染全部子组件
    return this.components.map((comp) => h(comp));
  },
};
</script>

<style lang="scss" scoped></style>
