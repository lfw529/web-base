<script setup>
// toRef
import { reactive, toRef } from 'vue'

const state = reactive({ count: 0 })

// 仅为 count 创建 Ref
const countRef = toRef(state, 'count')

countRef.value++ // 等价于 state.count++
console.log(state.count) // 1

// 反向也成立
state.count = 10
console.log(countRef.value) // 10
</script>

<template>
  <div>
    <h2>Count: {{ countRef }}</h2>
  </div>
</template>

<style scoped></style>

