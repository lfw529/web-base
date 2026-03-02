<script setup lang="ts">
// setup 语法糖
// 数据
const message = 'this is message'
// 函数
const logMessage = () => console.log(message)
</script>

<template>
  <div>
    <h2>{{ message }}</h2>
    <button @click="logMessage">log message</button>
  </div>
</template>

<style scoped></style>
