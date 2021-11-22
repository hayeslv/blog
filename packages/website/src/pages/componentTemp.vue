<!--
 * @Author: Lvhz
 * @Date: 2021-11-02 16:36:23
 * @Description: Description
-->

<script>
import { useRoute } from "vue-router";
import { toRaw, h, ref } from "vue";
import marked from "marked";
import Prism from 'prismjs'
import { ComponentApi } from '@api';
import { nextTick } from 'process';

export default {
  setup() {
    const visible = ref(false);
    const code = ref("");

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

    const showDrawer = async (comp) => {
      if(!comp.name) return
      const res = await ComponentApi.getFileByCompName({ name: comp.name })
      const { data } = res;
      if(!data.url) return;

      // 获取文件
      fetch(`${process.env.VUE_APP_FILE_ADDRESS}${data.url}`)
        .then((response) => response.text())
        .then((text) => {
          visible.value = true;
          code.value = marked("```javascript\n" + text + "\n```")
          nextTick(() => {
            Prism.highlightAll()
          })
        });
    };
    const onClose = () => {
      visible.value = false;
    };

    // 获取全部子组件
    return { code, visible, showDrawer, onClose, components: getAllComp() };
  },
  render() {
    
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
        <div class="markdown-body" innerHTML={this.code}></div>
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
