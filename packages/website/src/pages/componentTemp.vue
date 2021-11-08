<!--
 * @Author: Lvhz
 * @Date: 2021-11-02 16:36:23
 * @Description: Description
-->

<script>
import { useRoute } from "vue-router";
import { toRaw, h, ref } from "vue";
import marked from "marked";

export default {
  setup() {
    const visible = ref(false);
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

    const showDrawer = (comp) => {
      console.log(comp);
      visible.value = true;
    };
    const onClose = () => {
      visible.value = false;
    };

    // 获取全部子组件
    return { visible, showDrawer, onClose, components: getAllComp() };
  },
  render() {
    const code = ref("");
    fetch("http://localhost:7001/public/echart.config.ts")
      .then((response) => response.text())
      .then((text) => (code.value = marked("```js\n" + text + "\n```")));
    // 渲染全部子组件
    // return this.components.map((comp) => h(comp));
    return [
      <div class="comp">
        {this.components.map((comp) =>
          h(comp, {
            onClick: (e) => this.showDrawer(comp, e),
          })
        )}
      </div>,
      <a-drawer
        width="800px"
        title="config文件"
        placement="right"
        closable={false}
        visible={this.visible}
        onClose={this.onClose}
      >
        <div class="markdown-body" innerHTML={code.value}></div>
      </a-drawer>,
    ];
  },
};
</script>

<style lang="scss" scoped>
.comp {
  display: flex;
  flex-wrap: wrap;
  .echart-wrap {
    color: #fff;
    margin-bottom: 40px;
    max-width: 100%;
  }
  .echart-wrap:nth-of-type(2n-1) {
    margin-right: 40px;
  }
}
</style>
