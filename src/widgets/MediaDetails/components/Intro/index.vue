<template>
  <div class="flex flex-col gap-10 sm:block lg:grid grid-cols-[1fr_1fr] xl:block">
    <div
      v-if="videoKey"
      data-testid="intro-video"
      class="relative pt-[65%] w-full max-w-4xl mx-auto"
    >
      <iframe
        :src="`https://www.youtube.com/embed/${videoKey}`"
        class="absolute top-0 left-0 w-full h-full"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
        title="YouTube video player"
      ></iframe>
    </div>

    <div class="-order-1 sm:order-none">
      <h2 data-testid="intro-title" class="sm:mt-6 font-bold text-xl text-center">{{ title }}</h2>
      <p data-testid="intro-description" class="mt-4 text-xl leading-[1.2]">{{ description }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type Props from './index.type';

defineProps<Props>();
</script>
