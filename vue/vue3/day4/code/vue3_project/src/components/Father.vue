<script setup>
  import { ref } from 'vue'
  const firstName = ref('John')
  const lastName = ref('Doe')
</script>

<template>
  <Child 
    v-model:first-name="firstName"
    v-model:last-name="lastName"
  />
</template>

