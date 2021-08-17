<!--
 * @Author: Lvhz
 * @Date: 2021-06-25 11:44:33
 * @Description: Description
-->
<template>
  <div class="baidu">
    <div class="list">

    </div>
    <!-- <div id="map" :style="style"></div> -->
    <div id="map"></div>
  </div>
</template>

<script>
// import { getSacleRate } from '@/layout/flexible.js';
import MapConfig from './map.config.js';
import { BaiduApi } from '@api';
// eslint-disable-next-line no-unused-vars
import { getBMapIcon, drawPoints, getMonitorInfoPopHTML } from './utils/tools';
export default {
  // computed: {
  //   style() {
  //     const rate = getSacleRate();
  //     const scaleNum = 1 / rate;
  //     return {
  //       width: `calc((100% - 1630px) * ${rate})`,
  //       height: `calc(1850px * ${rate})`,
  //       transform: `scale(${scaleNum})`,
  //       'transform-origin': 'left top'
  //     };
  //   }
  // },
  data() {
    return {
      map: null,
      BMap: null, // 百度地图公共实例
      BMapLib: null,
      infoBox: null, // 地图pop弹层信息
      preMarker: null, // 上一个被选中的点位
      allMonitorList: [], // 全部监控列表
      markersList: [] // 全部点位信息
    };
  },
  mounted() {
    this.initMap();
    this.initPoint(); // 打点
    this.initMarkerPop(); // 初始化popup
  },
  methods: {
    // 百度地图初始化
    async initMap() {
      const BMap = window.BMap;
      this.BMap = BMap;
      this.BMapLib = window.BMapLib;
      const map = (this.map = new BMap.Map('map', {
        enableMapClick: false // 禁用默认的弹窗
      }));
      const center = await this.gpsTranslateToBaiDu([new BMap.Point(...MapConfig.center)]);
      map.centerAndZoom(center[0], MapConfig.zoom);
      map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
    },
    // GPS坐标转百度坐标  注意一次只能转换10个
    gpsTranslateToBaiDu(pointArr) {
      return new Promise((resolve, reject) => {
        const convertor = new window.BMap.Convertor();
        convertor.translate(pointArr, 1, 5, data => {
          if (data.status === 0) {
            resolve(data.points);
          } else {
            reject();
          }
        });
      });
    },
    // 初始化监控点位（地图打点）
    async initPoint() {
      const monitorList = await this.getMonitorList(); // 获取全部监控点位
      this.allMonitorList = monitorList || [];
      const icon = getBMapIcon(this.BMap, MapConfig.monitor00);

      // 包装点位信息
      const markers = [];
      for (let i = 0; i < monitorList.length; i++) {
        const item = monitorList[i];
        const point = new this.BMap.Point(item.longitude, item.latitude);
        const marker = new this.BMap.Marker(point, { icon: icon }); // 自定义icon
        markers.push(marker);
        marker.addEventListener('click', () => {
          this.showMapPop(i); // 显示点位弹层pop
        });
      }
      this.markersList = markers || [];

      drawPoints(this.map, markers); // 单纯打点

      // new this.BMapLib.MarkerClusterer(this.map, { markers: markers }); // 点位聚合
    },
    // 初始化监控点位pop
    initMarkerPop() {
      this.infoBox = new this.BMapLib.InfoBox(this.map, '', {
        boxStyle: {
          background: '#FFFFFF',
          maxWidth: '370px',
          minWidth: '320px',
          width: 0
        },
        closeIconMargin: '0 10px 0 0',
        closeIconUrl: MapConfig.popCloseImg,
        enableAutoPan: true,
        enableCloseOnClick: true
      });
      this.infoBox.addEventListener('close', () => {
        const icon = getBMapIcon(this.BMap, MapConfig.monitor00);
        this.preMarker.setIcon(icon);
        this.preMarker = null;
      });
      this.map.addEventListener('click', e => {
        if (!e.overlay) this.infoBox.close();
      });
    },
    // 显示监控pop
    showMapPop(index) {
      this.resetMarker();

      const curMarker = this.markersList[index];
      const curMonitor = this.allMonitorList[index];
      // const point = curMarker.point;
      // this.map.setCenter(point);


      const icon = getBMapIcon(this.BMap, MapConfig.monitor01);
      curMarker.setIcon(icon);
      this.preMarker = curMarker;

      
      const content = getMonitorInfoPopHTML(curMonitor.deviceChanel, curMonitor.deviceName, curMonitor.area);
      this.infoBox.open(curMarker);
      this.infoBox.setContent(content);

      document.getElementById('playvideo').addEventListener('click', async() => {
        // const deviceChanel = curMonitor.deviceChanel || '';
        // const res = await commonApi.getMonitorUrl(deviceChanel);
        // const src = res.data || '';
        // curMonitor.src = src;
        // this.$bus.$emit('videoPopShow', curMonitor);
      });
    },
    // 将上一个active的点位重置为正常
    resetMarker() {
      const icon = getBMapIcon(this.BMap, MapConfig.monitor00);
      this.preMarker && this.preMarker.setIcon(icon);
    },
    // 从接口获取全部监控点位信息
    async getMonitorList() {
      const res = await BaiduApi.getBaiduPoint();
      const dataList = res.data || [];
      return dataList;
    }
  }
};
</script>

<style lang="scss" scoped>
.baidu{
  display: flex;
  box-sizing: border-box;
  padding: 20px;
}
.list{
  width: 200px;
}
#map{
  width: 1500px;
  height: 800px;
  border-radius: 12px;
  margin: 20px auto;
}
</style>
<style lang="scss">
// 点位pop弹框样式
.infoBox {
  background: #fff;
  color: #333;
  -webkit-box-shadow: 0 3px 14px rgba(0, 0, 0, 0.4);
  box-shadow: 0 3px 14px rgba(0, 0, 0, 0.4);
  border-radius: 12px;
  padding-top: 10px;
  &::after {
    content: "";
    position: absolute;
    left: 50%;
    bottom: -9px;
    background: #ffffff;
    width: 18px;
    height: 18px;
    transform: translateX(-50%) rotate(45deg);
  }
  .device-box {
    padding-top: 20px;
    .content {
      padding: 0 20px;
      .item {
        font-size: 14px;
        font-family: SourceHanSansCN-Regular, SourceHanSansCN;
        font-weight: 400;
        color: #33485a;
        margin: 10px 0;
        word-break: break-all;
        .title {
          color: #677881;
        }
      }
    }

    .operation {
      height: 70px;
      border-top: 1px solid #dfe5f4;
      display: flex;
      padding: 0 20px;
      .item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        user-select: none;
        .img {
          width: 28px;
          height: 28px;
        }
        .text {
          margin: 0;
          margin-top: 5px;
          font-size: 12px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #1ea1ff;
        }
      }
      .icon {
        width: 12px;
        height: 12px;
      }
    }
  }
}
</style>
