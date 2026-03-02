<script lang="ts">
// setup
// 1. 执行时机，比 beforeCreate 更早
import Demo1 from './components/demo1.vue'
import Demo2 from './components/demo2.vue'
import Demo3 from './components/demo3.vue'
import Demo4 from './components/demo4.vue'
import Demo5 from './components/demo5.vue'
import Demo6 from './components/demo6.vue'
import Demo7 from './components/demo7.vue'
import Demo8 from './components/demo8.vue'
import Demo9 from './components/demo9.vue'
import Demo10 from './components/demo10.vue'
import Demo11 from './components/demo11.vue'
import Demo12 from './components/demo12.vue'

export default {
  components: {
    Demo1,
    Demo2,
    Demo3,
    Demo4,
    Demo5,
    Demo6,
    Demo7,
    Demo8,
    Demo9,
    Demo10,
    Demo11,
    Demo12,
  },
  setup () {
    //2. 在 Vue 3 的 setup() 函数中确实无法访问 this，这是设计上的有意为之
    console.log('setup 函数', this)
  },
  beforeCreate () {
    console.log('beforeCreate 函数')
  }
}
</script>

<template>
  <Demo1></Demo1>
  <hr>
  <Demo2></Demo2>
  <hr>
  <Demo3></Demo3>
  <hr>
  <Demo4></Demo4>
  <hr>
  <Demo5></Demo5>
  <hr>
  <Demo6></Demo6>
  <hr>
  <Demo7></Demo7>
  <hr>
  <Demo8></Demo8>
  <hr>
  <Demo9></Demo9>
  <hr>
  <Demo10></Demo10>
  <hr>
  <Demo11></Demo11>
  <hr>
  <Demo12></Demo12>
</template>

<style scoped></style>
