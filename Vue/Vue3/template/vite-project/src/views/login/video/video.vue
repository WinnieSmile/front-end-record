<template>
  <div class="video">
    <svg-icon
      icon-class="left_row_grey"
      @click="back"
      className="back-img"
      v-if="showControl"
    ></svg-icon>

    <svg-icon
      v-if="showControl"
      icon-class="share"
      @click="back"
      className="share-img"
    ></svg-icon>
    <video
      id="d3Video"
      :src="src"
      autoplay
      controls
      disablePictureInPicture
      controlsList="nofullscreen nodownload noremote noplaybackrate"
      @touchstart="clickVideo"
    ></video>

    <div class="video-time" v-if="showControl">
      <span>{{ curTime }}</span>
      /
      <span>{{ totalTime }}</span>
    </div>
  </div>
</template>
  <script setup name="video">
import { useRouter } from "vue-router";
import { onMounted, ref } from "vue";
const router = useRouter();
const src = ref("");
src.value = "http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4";
function back() {
  router.push("/home");
}
const showControl = ref(true);
const curTime = ref("0:00");
const totalTime = ref("0:00");
const playStatus = ref(false);

const timer = ref(null);
onMounted(() => {
  let video = document.getElementById("d3Video");
  video.addEventListener("canplay", function () {
    var timers = Math.ceil(this.duration); //视频总时长
    totalTime.value = sTimeChangeToMin(timers);
  });
  video.addEventListener("timeupdate", function () {
    var timers = Math.ceil(this.currentTime); //视频总时长
    curTime.value = sTimeChangeToMin(timers);
  });
  video.addEventListener("play", function () {
    playStatus.value = true;
    setTimeout(() => {
      showControl.value = false;
    }, 500);
  });
  // 9、pause：暂停监听
  video.addEventListener("pause", function () {
    playStatus.value = false;
    showControl.value = true;
    if (timer.value) {
      clearTimeout(timer.value);
      timer.value = null;
    }
  });
});
function clickVideo() {
  console.log("click");
  if (playStatus.value) {
    setTimeout(() => {
      showControl.value = true;
    }, 400);
    timer.value = setTimeout(() => {
      showControl.value = false;
      timer.value = null;
    }, 3000);
  }
}
function sTimeChangeToMin(val) {
  let m = Math.trunc(val / 60);
  let s = (val % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}
</script>
  <style lang="scss" scoped>
.video {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: #000;
  z-index: 99;
  position: relative;
  display: flex;

  .back-img {
    position: absolute;
    left: 15px;
    top: 12px;
    height: 20px;
    width: 20px;
    z-index: 9999;
  }
  .share-img {
    position: absolute;
    right: 15px;
    top: 12px;
    height: 20px;
    width: 20px;
    z-index: 9999;
  }
  video {
    width: 100%;
  }
  .video-time {
    font-size: 12px;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: #ffffff;
    position: absolute;
    right: 15px;
    bottom: 20px;
  }
}
//全屏按钮
video::-webkit-media-controls-fullscreen-button {
  display: none;
}

//播放按钮
video::-webkit-media-controls-play-button {
  //display: none;
  position: absolute;
  left: 15px;
  bottom: 4px;
}

//进度条
video::-webkit-media-controls-timeline {
  padding: 0;
  position: absolute;
  left: 45px;
  bottom: 25px;
  width: calc(100% - 140px);
}

//观看的当前时间
video::-webkit-media-controls-current-time-display {
  display: none;
}

//剩余时间
video::-webkit-media-controls-time-remaining-display {
  display: none;
}

//音量按钮
video::-webkit-media-controls-mute-button {
  display: none;
}

video::-webkit-media-controls-toggle-closed-captions-button {
  //display: none;
}

//音量的控制条
video::-webkit-media-controls-volume-slider {
  //display: none;
}

//所有控件
video::-webkit-media-controls-enclosure {
  //display: none;
}
</style>
  