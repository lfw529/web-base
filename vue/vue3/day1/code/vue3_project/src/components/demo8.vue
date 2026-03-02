<script setup>
import { ref, computed } from 'vue'

const firstName = ref('张')
const lastName = ref('三')

const fullName = computed({
  get() {
    return `${firstName.value} - ${lastName.value}`
  },
  set(newValue) {
    const [first, last] = newValue.split(' ')
    firstName.value = first
    lastName.value = last
  }
})

// 使用
fullName.value = '李 四' // 触发 setter
console.log(firstName.value) // '李'
</script>

<template>
  <div>
    <h2>Full Name: {{ fullName }}</h2>
  </div>
</template>

<style scoped></style>

