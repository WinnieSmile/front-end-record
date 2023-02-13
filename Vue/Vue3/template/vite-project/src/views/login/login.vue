<script setup lang="ts">
import { ref } from "vue";
import useStore from "../../stores/storeTest";
const store = useStore();
store.count += 1;
store.msg += "develops";

defineProps<{ msg: string }>();

const count = ref(0);
</script>

<template>
  <div>
    <h1>{{ msg }}</h1>
    <div>第二行</div>
    <div>{{ store.count }}</div>
    <div>{{ store.msg }}</div>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
