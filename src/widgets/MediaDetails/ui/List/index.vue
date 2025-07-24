<template>
  <li
    class="text-lg w-full min-h-14 p-4 flex items-center justify-between gap-6 rounded-lg bg-slate-600"
  >
    <span class="text-primary font-bold">{{ $t(title) }}: </span>
    <span class="text-white text-end leading-[1.2]">{{ description }}</span>
  </li>
</template>

<script setup lang="ts">
interface Props {
  title: string;
  description: string | number;
}

defineProps<Props>();
</script>
