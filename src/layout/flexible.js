/*
 * @Author: Lvhz
 * @Date: 2021-06-25 11:50:05
 * @Description: Description
 */


// 以宽度为基准，如果宽度过小，下方会空白
import debounce from 'lodash.debounce';

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


