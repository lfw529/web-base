<script setup>
import { watch, ref, reactive } from 'vue'

// 1. 监听 ref
const count = ref(0)
watch(count, (newVal, oldVal) => {
  console.log(`count: ${oldVal} → ${newVal}`)
})

// 2. 监听 reactive 对象的某个属性（推荐用 getter）
const user = reactive({ name: 'Alice', age: 25 })
watch(
  () => user.age,
  (newAge, oldAge) => {
    console.log(`age: ${oldAge} → ${newAge}`)
  }
)

// 3. 监听多个源
watch([count, () => user.name], ([newCount, newName], [oldCount, oldName]) => {
  console.log('count or name changed')
})

// 4. immediate: true
watch(count, (newVal, oldVal) => {
  console.log(`immediate: true, newVal: ${newVal}, oldVal: ${oldVal}`) // 首次：0, undefined
}, { immediate: true })

// 5. deep: true
const obj = ref({ nested: { a: 1 } })
watch(obj, (newVal) => {
  console.log(`deep: true, nested changed: ${newVal.nested.a}`)
}, { deep: true })
</script>

<template>
  <div>
    <h2>Count: {{ count }}</h2>
    <button @click="count++">+1</button>
  </div>
  <div>
    <h2>User age: {{ user.age }}</h2>
    <button @click="user.age++">Change age</button>

    <h2>User name: {{ user.name }}</h2>
    <button @click="user.name = 'Bob'">Change name</button>
  </div>
  <div>
    <h2>Obj nested a: {{ obj.nested.a }}</h2>
    <button @click="obj.nested.a++">Change nested a</button>
  </div>
</template>

<style scoped></style>