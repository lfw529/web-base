<script setup>
const props = defineProps({
  firstName: String,
  lastName: String
})

const emit = defineEmits(['update:firstName', 'update:lastName'])

function updateFirst(name) {
  emit('update:firstName', name)
}
function updateLast(name) {
  emit('update:lastName', name)
}
</script>

<template>
  <input :value="firstName" @input="e => updateFirst(e.target.value)" />
  <input :value="lastName" @input="e => updateLast(e.target.value)" />
</template>