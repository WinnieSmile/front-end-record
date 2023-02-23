<script setup lang="ts">
import { ref } from "vue";
import useStore from "../../stores/storeTest";
import sun from "./animation/sun.vue";
import sunNight from "./animation/sun-night.vue";

import cloud from "./animation/cloud.vue";
import cloudNight from "./animation/cloud-night.vue";

import yintian from "./animation/yintian.vue";
import yintianNight from "./animation/yintian-night.vue";

import rain from "./animation/rain.vue";
import rainNight from "./animation/rain-night.vue";

import rainB from "./animation/rain-b.vue";
import rainBNight from "./animation/rain-b-night.vue";

import snow from "./animation/snow.vue";
import snowNight from "./animation/snow-night.vue";

const store = useStore();
store.count += 1;
store.msg += "develops";

defineProps<{ msg: string }>();

const count = ref(0);
</script>

<template>
  <div>
    <div>数字{{ store.count }}</div>
    <div>{{ store.msg }}</div>
    <div style="width: 400px; height: 400px">
      <!-- <sun-night /> -->
      <svg-icon :name="'dyna-n-cloud5'" />
    </div>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
