<template>
  <div class="bg-box">
    <!-- <sun v-if="type == 'sun'" />
    <sun-night v-if="type == 'sunNight'" />
    <cloud v-if="type == 'cloud'" />
    <cloud-night v-if="type == 'cloudNight'" />
    <yintian v-if="type == 'yintian'" />
    <yintian-night v-if="type == 'yintianNight'" />
    <rain v-if="type == 'rain'" />
    <rain-night v-if="type == 'rainNight'" />
    <rain-b v-if="type == 'rainB'" />
    <rain-b-night v-if="type == 'rainBNight'" />
    <snow v-if="type == 'snow'" />
    <snow-night v-if="type == 'snowNight'" /> -->
    
    <!-- <sun /> -->
    <sun-night />


  </div>
</template>
<script setup>
import sun from './sun.vue';
import sunNight from './sun-night.vue';

import cloud from './cloud.vue';
import cloudNight from './cloud-night.vue';

import yintian from './yintian.vue';
import yintianNight from './yintian-night.vue';

import rain from './rain.vue';
import rainNight from './rain-night.vue';

import rainB from './rain-b.vue';
import rainBNight from './rain-b-night.vue';

import snow from './snow.vue';
import snowNight from './snow-night.vue';
import { ref, defineProps, watch } from 'vue';
import { getNightStatus } from '../../../utils/common/parse-weather';
let type = ref('');
let props = defineProps({
  animationType: {
    type: String,
    default: '晴'
  }
});
let day = ['sun', 'cloud', 'yintian', 'rain', 'rainB', 'snow'];
let night = [
  'sunNight',
  'cloudNight',
  'yintianNight',
  'rainNight',
  'rainBNight',
  'snowNight'
];
watch(
  () => props.animationType,
  newV => {
    parasWeather(newV);
  }
);
parasWeather(props.animationType);
function parasWeather(val) {
  let key = val || ' ';
  if (key == '暴雨' || key == '大雨' || key == '大暴雨' || key == '特大暴雨') {
    getNightStatus() == 1 ? (type.value = day[4]) : (type.value = night[4]);
  } else if (key == '多云') {
    getNightStatus() == 1 ? (type.value = day[1]) : (type.value = night[1]);
  } else if (key == '雷雨') {
    getNightStatus() == 1 ? (type.value = day[4]) : (type.value = night[4]);
  } else if (key == '晴') {
    getNightStatus() == 1 ? (type.value = day[0]) : (type.value = night[0]);
  } else if (
    key == '雪' ||
    key == '微量降雪' ||
    key == '小雪' ||
    key == '中雪' ||
    key == '大雪' ||
    key == '暴雪' ||
    key == '大暴雪' ||
    key == '特大暴雪'
  ) {
    getNightStatus() == 1 ? (type.value = day[5]) : (type.value = night[5]);
  } else if (key == '小雨' || key == '微量降雨' || key == '中雨') {
    getNightStatus() == 1 ? (type.value = day[3]) : (type.value = night[3]);
  } else if (key == '阴天') {
    getNightStatus() == 1 ? (type.value = day[2]) : (type.value = night[2]);
  } else {
    getNightStatus() == 1 ? (type.value = day[0]) : (type.value = night[0]);
  }
  // test
  type.value = 'sun';
}
</script>
<style lang="scss" scoped>
.bg-box {
  width: 100vw;
  height: 100vh;
}
</style>
