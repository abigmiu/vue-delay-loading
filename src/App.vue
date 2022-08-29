<script setup lang="ts">
import { ref } from 'vue'
const loading = ref(true)
console.log(new Date())
setTimeout(() => {
    loading.value = false
}, 5000);
</script>

<template>
  <div>
    <div v-loading="loading" style="width: 200px; height: 200px; border: 1px solid black;"></div>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
