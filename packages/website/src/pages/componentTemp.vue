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
    const route = useRoute();
    const navs = toRaw(route).path.value;
    const length = navs.split("/").length;
    // 获取文件名（路由名）
    const nav = navs.split("/")[length - 1];

    // 获取文件路径
    const filePath = toRaw(route).meta.value.filePath;
    const { getComponent } = require(`@/${filePath}/${nav}/index.js`);
    console.log(getComponent());
    return { components: getComponent() };
  },
  render() {
    console.log(this.components);
    // return <div>123</div>;
    // return this.components[0].render();
    return [h(this.components[0]), h(this.components[1])];
  },
};
</script>

<style lang="scss" scoped></style>
