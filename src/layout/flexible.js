/*
 * @Author: Lvhz
 * @Date: 2021-10-12 16:42:06
 * @Description: Description
 */

import debounce from 'lodash.debounce';

const getScale = () => {
  let width = 3840; const height = 2160;
  const ww = window.innerWidth / width;
  const wh = window.innerHeight / height;
  // let rate = ww < wh ? ww : wh;
  // if (ww > wh) width = (width / rate) * ww;

  let rate = ww < wh ? ww : wh;
  if (ww > wh) width = (width / rate) * ww;

  if (wh > ww) rate = wh;


  if (rate > 0.99 && rate < 1.01) rate = 1;
  if (rate > 0.49 && rate < 0.51) rate = 0.5;
  return { rate, width, height };
};

const setScale = debounce(() => {
  const { rate, width, height } = getScale();
  let style = `width: ${width}px; height: ${height}px; transform-origin: left top;`;
  style += `transform: scale(${rate});`;
  document.body.style = style;
}, 200);
setScale();
window.addEventListener('resize', setScale);

export const getSacleRate = () => {
  const { rate } = getScale();
  return rate;
};


