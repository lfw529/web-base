<script setup>
// reactive: 接受一个对象类型的数据，返回一个响应式的对象
import { reactive } from 'vue'

const state = reactive({
  count: 100
})

const setCount = () => state.count++
</script>

<template>
  <div>
    <h2>{{ state.count }}</h2>
    <button @click="setCount">+1</button>
  </div>
</template>

<style scoped></style>