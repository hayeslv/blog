/*
 * @Author: Lvhz
 * @Date: 2021-03-23 15:22:37
 * @Description: 全局组件注册
 */
import PanelBac from '@comp/GlobalComp/PanelBac';
import Selector from '@comp/GlobalComp/Selector';

export default {
  install(Vue) {
    Vue.component('PanelBac', PanelBac);
    Vue.component('Selector', Selector);
  }
};

