<template>
  <div class="rain-box">
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
    <!-- 太阳 -->
    <svg-icon icon-class="dyna-sun1" className="sun1"></svg-icon>
    <svg-icon icon-class="dyna-sun2" className="sun2"></svg-icon>
    <svg-icon icon-class="dyna-sun3" className="sun3"></svg-icon>
    <div class="sunList">
      <svg-icon icon-class="dyna-sun4" className="sun4"></svg-icon>
      <svg-icon icon-class="dyna-sun5" className="sun5"></svg-icon>
      <svg-icon icon-class="dyna-sun4" className="sun41"></svg-icon>
      <svg-icon icon-class="dyna-sun5" className="sun51"></svg-icon>
      <svg-icon icon-class="dyna-sun6" className="sun6"></svg-icon>
    </div>
  </div>
</template>
<script></script>
<style scoped>
.rain-box {
  height: 100%;
  width: 100%;

  position: relative;
  overflow: hidden;
  background-image: url('@/assets/img/pic_home_bg_qingy&duoyun@2x.png');
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

/* 太阳 */
.sun1 {
  position: absolute;
  top: 31%;
  right: 13%;
  height: 30px;
  width: 30px;
}

.sun2 {
  position: absolute;
  top: 30.5%;
  right: 12.5%;
  height: 35px;
  width: 35px;
  animation: sun 8s linear infinite;
}

.sun3 {
  position: absolute;
  top: 30%;
  right: 11.5%;
  height: 42.5px;
  width: 42.5px;
  animation: sun 12s linear infinite;
}

.sunList {
  position: relative;
  top: 15%;
  left: 65%;
  height: 12.5px;
  width: 140px;
  transform: rotate(-60deg);
  animation: sunLine 12s linear infinite;
}

/*  */
.sun4 {
  position: absolute;
  top: 0;
  right: 30px;
  height: 2.5px;
  width: 2.5px;
}

.sun5 {
  position: absolute;
  top: 0;
  right: 19px;
  height: 10px;
  width: 10px;
}

/*  */
.sun41 {
  position: absolute;
  top: 6px;
  left: 17px;
  height: 2.5px;
  width: 2.5px;
}

.sun51 {
  position: absolute;
  top: -1px;
  left: 7px;
  height: 10px;
  width: 10px;
}

.sun6 {
  position: absolute;
  top: 0;
  left: 0;
  height: 13px;
  width: 13px;
}

@keyframes sun {
  0% {
    transform: scale(1);
  }

  25% {
    transform: scale(1.4);
  }

  50% {
    transform: scale(1.8);
  }

  75% {
    transform: scale(1.4);
  }

  100% {
    transform: scale(1);
  }
}

@keyframes sunLine {
  0% {
    transform: rotate(-60deg) scale(1);
    opacity: 0;
  }

  25% {
    transform: rotate(-50deg) scale(1.4);
    opacity: 0.8;
  }

  50% {
    transform: rotate(-40deg) scale(1.6);
    opacity: 1;
  }

  75% {
    transform: rotate(-30deg) scale(1.4);
    opacity: 0.8;
  }

  100% {
    transform: rotate(-20deg) scale(1);
    opacity: 0;
  }
}
</style>
