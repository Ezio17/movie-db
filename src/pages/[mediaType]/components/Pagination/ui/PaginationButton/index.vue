<template>
  <button
    class="h-14 w-28 bg-secondary rounded-sm font-bold text-xl flex justify-center items-center cursor-pointer"
    :class="{ 'opacity-50 pointer-events-none': disabled }"
    :disabled="disabled"
    data-testid="pagination-button"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
interface Props {
  disabled?: boolean;
}

defineProps<Props>();
defineEmits(['click']);
</script>
