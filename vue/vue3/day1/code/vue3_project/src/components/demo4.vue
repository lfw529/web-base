<script setup>
// ref: 接受简单类型或复杂类型，返回一个响应式的对象
import { ref } from 'vue'

const count = ref(0)
const setCount = () => count.value++
</script>

<template>
  <div>
    <h2>{{ count }}</h2>
    <button @click="setCount">+1</button>
  </div>
</template>

<style scoped></style>