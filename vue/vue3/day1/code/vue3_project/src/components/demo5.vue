<script setup>
// toRef / toRefs
import { reactive } from 'vue'

const state = reactive({ count: 0 })

// 直接解构 → count 是普通 number，非响应式！
const { count } = state

setTimeout(() => {
  state.count++ // 响应式更新
  console.log(count) // 仍然是 0！因为 count 是解构时的快照
}, 1000)
</script>

<template>
  <div>
    <h2>State count: {{ state.count }}</h2>
    <h2>Destructured count: {{ count }}</h2>
    <p>After 1 second, state.count will increment but destructured count will remain 0</p>
  </div>
</template>

<style scoped></style>