<template>
  <div class="rain-box">
    <span v-for="(item, i) in list" :key="i" :style="item"> </span>
  </div>
</template>
<script setup>
import { ref } from 'vue';
let list = ref([]);
for (let i = 0; i < 80; i++) {
  let i = Math.random() * 20 + 1;
  let j = Math.random() * 5 + 1;
  let str = `--i:${i};--j:${j}px`;
  list.value.push(str);
}
</script>
<style scoped>
.rain-box {
  height: 100%;
  width: 100%;

  position: relative;
  overflow: hidden;
  background-image: url('@/assets/img/w-snow.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.rain-box span {
  z-index: 5;
  position: relative;
  top: -20px;
  width: var(--j);
  height: var(--j);
  background-color: #ffffff;
  margin: 0 2px;
  display: inline-block;
  border-radius: 50%;
  animation: animate 120s linear infinite;
  animation-duration: calc(90s / var(--i));
  transform-origin: bottom;
  box-shadow: 0 0 10px #fff;
  transform: scale(var(--i) / 10);
}

@keyframes animate {
  0% {
    transform: translateY(0) scale(1);
  }

  25% {
    transform: translateY(150px) translateX(-5px) scale(1);
  }

  50% {
    transform: translateY(300px) translateX(0px) scale(1);
  }

  75% {
    transform: translateY(450px) translateX(5px) scale(1);
  }

  100% {
    transform: translateY(600px) translateX(0px) scale(0);
  }
}
</style>
