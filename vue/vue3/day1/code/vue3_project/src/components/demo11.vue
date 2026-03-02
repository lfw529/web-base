<template>
  <div>
    <Person ref="ren"/>
    <button @click="test">测试</button>
  </div>
</template>

<script setup>
import Person from '../../../../../day2/code/vue3_project/src/components/Person.vue'
import { ref } from 'vue'

const ren = ref()

function test() {
  console.log(ren.value.a)
  console.log(ren.value.b)
  console.log(ren.value.c)
}
</script>

<style scoped></style>