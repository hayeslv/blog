/*
 * @Author: Lvhz
 * @Date: 2021-06-11 10:29:29
 * @Description: Description
 */
import MapConfig from '../map.config.js';

// 获取包装Icon
export const getBMapIcon = (BMap, src) => {
  return new BMap.Icon(src, new BMap.Size(MapConfig.monitorImgWidth, MapConfig.monitorImgHeight));
};

// 地图打点（单个）
export const drawPoint = (map, marker) => {
  map.addOverlay(marker);
};

// 地图打点（多个）
export const drawPoints = (map, markers) => {
  markers.forEach(marker => {
    map.addOverlay(marker);
  });
};

// 获取监控信息pop的html
export const getMonitorInfoPopHTML = (deviceChanel, deviceName, area) => {
  // <p class="item"><span class="title">监控类型：</span>${curMonitor.monitorType}</p>
  return `<div class="device-box">
    <div class="content">
      <p class="item"><span class="title">监控编号：</span>${deviceChanel || ''}</p>
      <p class="item"><span class="title">监控名称：</span>${deviceName || ''}</p>
      <p class="item"><span class="title">地址：</span>${area || ''}</p>
    </div>
    <div class="operation">
      <div class="item" id="playvideo">
        <img class="img" src="${MapConfig.popPlayImg}">
        <p class="text">播放</p>
      </div>
    </div>
  </div>`;
};

