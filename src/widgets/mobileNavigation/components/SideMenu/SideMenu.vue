<template>
  <transition name="slide-left">
    <aside
      v-if="isOpen"
      class="fixed top-[var(--header-height)] left-0 h-full w-1/2 bg-gray-700 shadow-lg z-50"
      @click.stop
    >
      <button
        class="absolute top-4 right-4 text-2xl font-bold text-white hover:text-gray-300"
        aria-label="Close menu"
        @click="emit('close')"
      >
        &times;
      </button>

      <slot />
    </aside>
  </transition>
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
