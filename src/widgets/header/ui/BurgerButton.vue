<template>
  <button
    data-testid="burger-button"
    class="flex flex-col gap-1 justify-between w-8 focus:outline-none"
    @click="$emit('toggle')"
  >
    <span v-for="i in 3" :key="i" class="block h-1.5 bg-black transition-all duration-300"></span>
  </button>
</template>

<script setup lang="ts">
defineEmits<{
  toggle: [];
}>();
</script>
