<script setup>
import {
  ref,
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted
} from 'vue'

// 数据
let sum = ref(0)

// 方法
function add() {
  sum.value += 1
}


// 相当于 beforeCreate + created
console.log('setup: 组件初始化')

onBeforeMount(() => {
  console.log('onBeforeMount: 模板编译完成，未挂载')
})

onMounted(() => {
  console.log('onMounted: DOM 已挂载')
  // 初始化第三方库
})

onBeforeUpdate(() => {
  console.log('onBeforeUpdate: 数据已变，DOM 未更新')
})

onUpdated(() => {
  console.log('onUpdated: DOM 已更新')
})

onBeforeUnmount(() => {
  console.log('onBeforeUnmount: 组件即将卸载')
  // 清理工作
})

onUnmounted(() => {
  console.log('onUnmounted: 组件已销毁')
})
</script>

<template>
  <div class="demo12">
    <p>当前求和：{{ sum }}</p>
    <button @click="add">点我求和</button>
  </div>
</template>

<style scoped>
  .demo12 {
    background-color: skyblue;
    box-shadow: 0 0 10px;
    border-radius: 10px;
    padding: 20px;
  }
  button {
    margin: 0 5px;
  }
  li {
    font-size: 20px;
  }
</style>