/*
 * @Author: Lvhz
 * @Date: 2021-04-23 10:22:22
 * @Description: 大屏自适应布局（不规则屏）
 */
// import { getQueryString } from '@/common/js/util.js';
import debounce from 'lodash.debounce';

export default {
  install(Vue) {
    // // let width = getQueryString('width') || 4992;
    // // let height = getQueryString('height') || 1512;
    // let width = getQueryString('width') || 1920;
    // let height = getQueryString('height') || 1080;
    // const screen = getQueryString('screen') || true; // 默认是大屏模式

    // const screenWidth = window.screen.width; // 屏幕分辨率的宽
    // const screenHeight = window.screen.height; // 屏幕分辨率的高
    // const devicePixelRatio = window.devicePixelRatio; // 当前显示设备的物理像素分辨率与CSS像素分辨率之比

    // // 屏幕分辨率真实的宽高
    // const realPixelWidth = screenWidth * devicePixelRatio;
    // const realPixelHeight = screenHeight * devicePixelRatio;

    // // x轴缩放
    // const xScale = realPixelWidth / (width * devicePixelRatio);
    // // y轴缩放
    // const yScale = realPixelHeight / (height * devicePixelRatio);

    // let style = '';
    // if (screen !== 'false' && screen !== 'false/') {
    //   style += ` transform: scale(${xScale}, ${yScale}); overflow: hidden;`;
    // } else {
    //   const rate = 1 / devicePixelRatio;
    //   const toScreenHeightRate = screenHeight / height; // 转成屏幕分辨率的高
    //   width = width * toScreenHeightRate;
    //   height = height * toScreenHeightRate;
    //   console.log(rate);
    //   style += ` transform: scale(${rate}, ${rate}); overflow-y: hidden;  overflow-x: scoll;`;
    // }
    // style += `transform-origin: left top; width: ${width}px; height: ${height}px;`;

    // document.body.style = style;


    // 以宽度为基准，如果宽度过小，下方会空白

    const getScale = () => {
      // UI稿的宽高
      let width = 3840; const height = 2160;

      // 实际的宽高比
      const ww = window.innerWidth / width;
      const wh = window.innerHeight / height;

      // 使用较小的一个作为rate
      let rate = ww < wh ? ww : wh;

      // 如果宽度的rate较大，则宽度放长，让地图部分变宽
      if (ww > wh) {
        width = (width / rate) * ww;
      }

      if (rate > 0.99 && rate < 1.01) rate = 1;
      if (rate > 0.49 && rate < 0.51) rate = 0.5;
      return { rate, width, height };
    };

    const setScale = debounce(() => {
      
      // 获取到缩放比，设置它
      const { rate, width, height } = getScale();

      let style = `width: ${width}px; height: ${height}px; transform-origin: left top;`;
      style += `transform: scale(${rate});`;
      document.body.style = style;
    }, 200);
    setScale();
    window.addEventListener('resize', setScale);
  }
};
