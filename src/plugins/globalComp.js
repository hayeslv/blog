/*
 * @Author: Lvhz
 * @Date: 2021-03-23 15:22:37
 * @Description: 全局组件注册
 */
// import PanelBac from '@comp/GlobalComp/PanelBac';
// import Selector from '@comp/GlobalComp/Selector';


// 引入global下的全部组件
const importFn = require.context('../components/GlobalComp', true, /.vue$/);

export default {
  install(app) {
    // app.component('PanelBac', PanelBac);
    // app.component('Selector', Selector);
    importFn.keys().forEach(item => {
      // 导入函数根据文件名，导入文件内容
      const component = importFn(item).default
      // 根据导入的组件文件，实现自动全局注册
      app.component(component.name, component)
    })
  }
};

