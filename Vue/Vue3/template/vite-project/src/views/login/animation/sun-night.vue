<template>
  <div class="rain-box">
    <!-- 风车 -->
    <div class="hose-box">
      <svg-icon icon-class="dyna-house-y" className="house-b"></svg-icon>
      <svg-icon icon-class="dyna-fan-y" className="house-t"></svg-icon>
    </div>
    <!-- 树 -->
    <div class="tree-b">
      <svg-icon icon-class="dyna-b-tree-n" className="b"></svg-icon>
    </div>
    <div class="tree-s">
      <svg-icon icon-class="dyna-s-tree-n" className="s"></svg-icon>
    </div>
    <!-- 船 -->
    <svg-icon icon-class="dyna-ship-y" className="ship"></svg-icon>
    <!-- 反光波 -->
    <svg-icon icon-class="dyna-light-wave1-y" className="blink1"></svg-icon>
    <svg-icon icon-class="dyna-light-wave2-y" className="blink2"></svg-icon>
    <!-- 星星 -->
    <span v-for="(item, i) in list" :key="i" :style="item"> </span>
  </div>
</template>
<script setup>
import { ref } from 'vue';
let list = ref([]);
for (let i = 0; i < 100; i++) {
  let x = Math.random() * 100;
  let y = Math.random() * 52;
  let s = Math.random();
  let d = Math.random() * 10;
  let str = `--x:${x}%;--y:${y}%;--s:${s};--d:${d}`;
  list.value.push(str);
}
</script>
<style scoped>
.rain-box {
  height: 100%;
  width: 100%;

  position: relative;
  overflow: hidden;
  background-image: url('@/assets/img/pic_home_bg_night_sunny@2x.png');
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
  top: 5%;
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
/* 星星 */
.rain-box span {
  display: inline-block;
  position: absolute;
  top: var(--y);
  left: var(--x);
  height: 2px;
  width: 2px;
  background-color: #fff;
  border-radius: 50%;
  box-shadow: 0 0 10px #fff;
  transform: scale(var(--s));
  opacity: var(--s);
  animation: startC 10s linear infinite;
  animation-duration: calc(10s / var(--d));
}

@keyframes startC {
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}
</style>
