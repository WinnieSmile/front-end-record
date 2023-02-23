
<script setup lang="ts" name="SvgIcon">
import { defineProps, computed } from "vue";
let prop = defineProps({
  iconClass: {
    type: String,
    required: true,
  },
  className: {
    type: String,
    default: "",
  },
  moreClassName: {
    type: Array,
    default: () => {
      return [];
    },
  },
});

let iconName = computed(() => {
  return `#icon-${prop.iconClass}`;
});
let svgClass = computed(() => {
  if (prop.moreClassName.length > 0) {
    let str = "";
    for (let i = 0; i < prop.moreClassName.length; i++) {
      const el = prop.moreClassName[i];
      str += el + " ";
    }
    return "svg-icon " + str;
  }
  if (prop.className) {
    return "svg-icon " + prop.className;
  } else {
    return "svg-icon";
  }
});
</script>

<template>
  <svg :class="svgClass" aria-hidden="true" v-on="$listeners">
    <use :xlink:href="iconName" />
  </svg>
</template>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
  