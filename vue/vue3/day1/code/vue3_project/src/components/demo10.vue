<template>
  <div class="person">
    <h1 ref="title1" id="title1">lfw</h1>
    <h2 ref="title2">前端</h2>
    <h3 ref="title3">Vue</h3>
    <input type="text" ref="inpt">
    <br><br>
    <button @click="showLog">点我打印内容</button>
  </div>
</template>

<script setup>
// ref 用在标签上
import { ref } from 'vue'

const title1 = ref()
const title2 = ref()
const title3 = ref()
const inpt = ref()

function showLog() {
  // 通过id获取元素
  const t1 = document.getElementById('title1')
  // 打印内容
  console.log(t1?.innerText)
  
  // 通过ref获取元素
  console.log(title1.value)
  console.log(title2.value)
  console.log(title3.value)
  console.log(inpt.value)
}
</script>

<style scoped>
.person {
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  max-width: 400px;
  margin: 0 auto;
}

h1, h2, h3 {
  margin: 10px 0;
}

input {
  padding: 8px;
  margin: 10px 0;
  width: 100%;
  box-sizing: border-box;
}

button {
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}
</style>