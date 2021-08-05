<!--
 * @Author: Lvhz
 * @Date: 2021-04-17 21:02:59
 * @Description: Description
-->
<template>
  <div class="video-block">
    <video id="video-flood" ref="myVideo" muted style="width: 100%; height: 100%; object-fit: fill;" class="video-js vjs-default-skin vjs-big-play-centered" controls preload="auto" data-setup="{}">
      <source :src="src1" type="application/x-mpegURL" class="src">
    </video>
  </div>
</template>

<script>
import 'video.js/dist/video-js.css';
import videojs from 'video.js';
// import 'videojs-flash';
import 'videojs-contrib-hls';
export default {
  props: {
    src: {
      type: String,
      default: ''
    },
    index: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      src1: 'http://1252093142.vod2.myqcloud.com/4704461fvodcq1252093142/48c8a9475285890781000441992/playlist.m3u8', // 讲义
      // src1: 'https://www.2021lllllll.com/vid888/202011/26/5fbf177306f73a1d14777b65/3f92db/index.m3u8', // 测试片子
      // src1: 'rtsp://157.122.91.119:8900/cam/realmonitor?channel=7&subtype=1',
      videoPlayer: null
    };
  },
  watch: {
    src(val) {
      this.videoPlayer && this.videoPlayer.src(val);
    }
  },
  mounted() {
    this.initVideo();
  },
  beforeDestroy() {
    // this.videoPlayer.pause();
    this.videoPlayer.dispose(); //销毁
  },
  methods: {
    initVideo() {
      // const that = this;
      if (this.videoPlayer) this.videoPlayer.dispose();
      this.$nextTick(() => {
        this.videoPlayer = videojs(`video-flood`, {
          // bigPlayButton: true,
          // textTrackDisplay: false,
          // posterImage: false,
          // errorDisplay: false,
          autoplay: true, // 自动播放
          preload: true //预加载
        }, function onPlayerReady() {
          this.play();

          // this.on('timeupdate', function(e) {
          // });
          this.on('error', function(e) {
            // that.videoPlayer.load();
            // this.videoPlayer.play();
          });
        });
        // this.videoPlayer.src({
        //   src: this.src,
        //   type: 'application/x-mpegURL' //在重新添加视频源的时候需要给新的type的值
        // });
        // this.videoPlayer.play();
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.video-block{
  width: 200px;
  height: 160px;
}
</style>
