/*
 * @Author: Lvhz
 * @Date: 2021-03-23 15:22:37
 * @Description: 全局组件注册
 */
import PanelBac from '@comp/GlobalComp/PanelBac';
import Selector from '@comp/GlobalComp/Selector';
import SvgIcon from '@/components/SvgIcon';


export default {
  install(app) {
    app.component('PanelBac', PanelBac);
    app.component('Selector', Selector);
    app.component('svg-icon', SvgIcon);

    // const SvgIcon = require('@/components/SvgIcon')
    // app.component('svg-icon', SvgIcon);
    // console.log(222);
    // const req = require.context('../assets/icon/svg', false, /\.svg$/)
    // const requireAll = requireContext => requireContext.keys().map(requireContext)
    // requireAll(req)
  }
};

