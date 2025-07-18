<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-black bg-opacity-40 z-40 top-[var(--header-height)]"
    @click="emit('close')"
  />
</template>

<script lang="ts" setup>
interface Props {
  isOpen: boolean;
}

defineProps<Props>();

const emit = defineEmits<{
  close: [];
}>();
</script>
