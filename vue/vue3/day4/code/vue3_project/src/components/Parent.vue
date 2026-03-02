<script setup>
// 父传子
// 1. 给子组件，添加属性的方式传值
// 2. 在子组件，通过props接收

// 子传父
// 1. 在子组件，通过 emit 触发事件，传递数据
// 2. 在父组件，通过 @ 监听事件，接收数据

// 局部组件 (导入进来就能用)
import { ref } from 'vue' 
import Child from './Child.vue' 

const money = ref(100)

const getMoney = () => {
  money.value += 10
}

const changeFn = (newMoney) => {
  money.value = newMoney
}
</script>

<template>
  <div>
    <h3>父组件 - {{ money }}
      <button @click=getMoney>给子组件转账</button>
    </h3>
    <!-- 给子组件，添加属性的方式传值 -->
    <Child 
    @changeMoney="changeFn"
    car="宝马" :money="money"></Child>
  </div>
</template>
