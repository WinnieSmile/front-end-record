<template>
  <div class="rain-box">
    <!-- 波纹 -->
    <div class="bowen" style="--x: 26%; --y: 70%; --d: 10"></div>
    <div class="bowen" style="--x: 36%; --y: 64%; --d: 13"></div>
    <div class="bowen" style="--x: 62%; --y: 65%; --d: 17"></div>
    <div class="bowen" style="--x: 90%; --y: 65%; --d: 15"></div>
    <!-- 风车 -->
    <div class="hose-box">
      <svg-icon icon-class="dyna-house" className="house-b"></svg-icon>
      <svg-icon icon-class="dyna-fan" className="house-t"></svg-icon>
    </div>
    <!-- 树 -->
    <div class="tree-b">
      <svg-icon icon-class="dyna-b-tree-w" className="b"></svg-icon>
    </div>
    <div class="tree-s">
      <svg-icon icon-class="dyna-s-tree-w" className="s"></svg-icon>
    </div>
    <!-- 船 -->
    <svg-icon icon-class="dyna-ship" className="ship"></svg-icon>
    <!-- 反光波 -->
    <svg-icon icon-class="dyna-light-wave1" className="blink1"></svg-icon>
    <svg-icon icon-class="dyna-light-wave2" className="blink2"></svg-icon>
    <!-- 云 -->
    <svg-icon icon-class="dyna-w-cloud1" className="cloud1"></svg-icon>
    <svg-icon icon-class="dyna-w-cloud2" className="cloud2"></svg-icon>

    <svg-icon icon-class="dyna-w-cloud3" className="cloud3"></svg-icon>
    <svg-icon icon-class="dyna-w-cloud4" className="cloud4"></svg-icon>
    <svg-icon icon-class="dyna-w-cloud5" className="cloud5"></svg-icon>
    <svg-icon icon-class="dyna-w-cloud6" className="cloud6"></svg-icon>
    <svg-icon icon-class="dyna-w-cloud7" className="cloud7"></svg-icon>
    <!-- 雨 -->
    <span v-for="(item, i) in list" :key="i" :style="item"> </span>
  </div>
</template>
<script setup>
import { ref } from 'vue';
let list = ref([]);
for (let i = 0; i < 200; i++) {
  let d = Math.random() * 10 + 10;
  let str = `--d:${d}`;
  list.value.push(str);
}
</script>
<style scoped>
.rain-box {
  height: 100%;
  width: 100%;

  position: relative;
  overflow: hidden;
  background-image: url('@/assets/img/w-yt-bg.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

/* 风车 */
.hose-box {
  position: relative;
  top: 58.5%;
  left: 6%;
  width: 70px;
  height: 100px;
  display: flex;
  justify-content: center;
}

.house-b {
  position: absolute;
  bottom: 0;
  width: 38px;
  height: 63px;
  z-index: 2;
}

.house-t {
  position: absolute;
  top: 1%;
  width: 74px;
  height: 74px;
  z-index: 1;
  animation: fan 10s linear infinite;
}

@keyframes fan {
  0% {
    transform: rotate(0deg);
  }

  50% {
    transform: rotate(180deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

/* 树 */
.tree-b {
  position: absolute;
  top: 68%;
  left: 3%;
  height: 60px;
  animation: tree 10s linear infinite;
}

.b {
  height: 30px;
}

.tree-s {
  position: absolute;
  top: 69%;
  left: 6%;
  height: 40px;
  animation: tree 2s linear infinite;
}

.s {
  height: 20px;
}

@keyframes tree {
  0% {
    transform: rotate(0deg);
  }

  25% {
    transform: rotate(3deg);
  }

  50% {
    transform: rotate(0deg);
  }

  75% {
    transform: rotate(-3deg);
  }

  100% {
    transform: rotate(0deg);
  }
}

/* 船 */
.ship {
  position: absolute;
  top: 58%;
  left: 50%;
  width: 21px;
  height: 30px;
  animation: ship 12s linear infinite;
}

@keyframes ship {
  0% {
    transform: translateX(0px);
  }

  25% {
    transform: translateX(-40px);
  }

  50% {
    transform: translateX(0px);
  }

  75% {
    transform: translateX(40px);
  }

  100% {
    transform: translateX(0px);
  }
}

/* 反光波 */
.blink1 {
  position: absolute;
  top: 62%;
  left: 20%;
  width: 111px;
  height: 13px;
  animation: blinkT 12s linear infinite;
}

.blink2 {
  position: absolute;
  top: 65%;
  left: 60%;
  width: 134px;
  height: 15px;
  animation: blinkT 8s linear infinite;
}

@keyframes blinkT {
  0% {
    transform: translateX(0px);
  }

  25% {
    transform: translateX(-20px);
  }

  50% {
    transform: translateX(0px);
  }

  75% {
    transform: translateX(20px);
  }

  100% {
    transform: translateX(0px);
  }
}

/* 多云 */
.cloud1 {
  position: absolute;
  top: 38%;
  left: 0%;
  width: 51px;
  height: 22px;
  animation: cloud 12s linear infinite;
}

.cloud2 {
  position: absolute;
  top: 42%;
  left: 5%;
  width: 71px;
  height: 32px;
  animation: cloud 12s linear infinite;
}

.cloud3 {
  position: absolute;
  top: 38%;
  right: 30%;
  width: 95px;
  height: 32px;
  animation: cloudr 12s linear infinite;
}

.cloud4 {
  position: absolute;
  top: 35%;
  right: 10%;
  width: 48px;
  height: 21px;
  animation: cloudr 12s linear infinite;
}

.cloud5 {
  position: absolute;
  top: 42%;
  right: 12%;
  width: 51px;
  height: 22px;
  animation: cloudr 12s linear infinite;
}

.cloud6 {
  position: absolute;
  top: 38%;
  right: -5%;
  width: 62px;
  height: 21px;
  animation: cloudr 12s linear infinite;
}

.cloud7 {
  position: absolute;
  top: 30%;
  right: 0;
  width: 71px;
  height: 32px;
  animation: cloudr 12s linear infinite;
}

@keyframes cloud {
  0% {
    transform: translateX(0px);
  }

  25% {
    transform: translateX(-20px);
  }

  50% {
    transform: translateX(0px);
  }

  75% {
    transform: translateX(20px);
  }

  100% {
    transform: translateX(0px);
  }
}

@keyframes cloudr {
  0% {
    transform: translateX(0px);
  }

  25% {
    transform: translateX(20px);
  }

  50% {
    transform: translateX(0px);
  }

  75% {
    transform: translateX(-30px);
  }

  100% {
    transform: translateX(0px);
  }
}

/* 波纹 */
.bowen {
  position: absolute;
  top: var(--y);
  right: var(--x);
  height: 10px;
  width: 40px;
  border: 1px solid #f9f7f7;
  border-radius: 50%;
  animation: bo 4s linear infinite;
  animation-duration: calc(20s / var(--d));
}

.bowen::before {
  content: '';
  display: block;
  position: absolute;
  top: 1px;
  right: -1px;
  height: 5px;
  width: 40px;
  transform: scale(0.6);
  border: 1px solid #f9f7f7;
  border-radius: 50%;
}

@keyframes bo {
  0% {
    transform: scale(1);
    opacity: 1;
  }

  50% {
    transform: scale(1.3);
    opacity: 0.4;
  }

  100% {
    transform: scale(1.5);
    opacity: 0;
  }
}

/* 雨 */
.rain-box span {
  z-index: 5;
  position: relative;
  display: inline-block;
  top: -10px;
  left: 25px;
  width: 2px;
  height: 30px;
  background: linear-gradient(#ffffff00 0%, #ffffff50 50%, #ffffff90 100%);
  margin: 0 5px;
  animation: animate 50s linear infinite;
  animation-duration: calc(35s / var(--d));
  transform-origin: bottom;
}

@keyframes animate {
  0% {
    transform: translateY(0) rotate(25deg) scale(1);
  }

  25% {
    transform: translateY(20vh) translateX(-10vw) rotate(25deg) scale(1);
  }

  50% {
    transform: translateY(40vh) translateX(-20vw) rotate(25deg) scale(1);
  }

  75% {
    transform: translateY(60vh) translateX(-30vw) rotate(25deg) scale(0.3);
    opacity: 0.3;
  }

  100% {
    transform: translateY(80vh) translateX(-40vw) rotate(25deg) scale(0);
    opacity: 0;
  }
}
</style>
