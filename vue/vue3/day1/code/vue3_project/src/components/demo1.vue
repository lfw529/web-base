<script lang="ts">
import { ref } from 'vue'
// setup 返回值用法
export default {
  setup() {
    const count = ref(0)
    const increment = () => count.value++

    return {
      count,
      increment
    }
  }
}
</script>

<template>
  <div>{{ count }}</div>
  <button @click="increment">+1</button>
</template>

<style scoped></style>
