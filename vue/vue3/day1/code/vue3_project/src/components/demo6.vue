<script setup>
// toRefs
import { reactive, toRefs } from 'vue'

const state = reactive({
  name: 'Alice',
  age: 25
})

// 安全解构，保持响应性
const { name, age } = toRefs(state)

// 在 JS 中访问/修改需用 .value
console.log(name.value) // 'Alice'
age.value = 26

// 模板中可直接使用 name、age（自动解包）
</script>

<template>
  <div>
    <h2>Name: {{ name }}</h2>
    <h2>Age: {{ age }}</h2>
  </div>
</template>

<style scoped></style>