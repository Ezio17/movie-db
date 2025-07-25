<template>
  <div
    data-testid="view-more-card"
    class="bg-black h-[278px] w-[185px] text-white text-xl font-bold flex justify-center items-center cursor-pointer"
    @click="emit('click')"
  >
    <p>{{ $t('View all') }}</p>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  click: [];
}>();
</script>
