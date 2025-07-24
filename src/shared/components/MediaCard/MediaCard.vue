<template>
  <div class="w-[185px] flex flex-col gap-3 cursor-pointer group" @click="emit('click')">
    <img
      v-if="mediaData.poster_path"
      :src="generateImgPath('w185', mediaData.poster_path)"
      alt="poster"
      class="h-[278px]"
      loading="lazy"
    />
    <img v-else :src="notFind" alt="No image" class="h-[278px]" />

    <h3 class="text-lg leading-snug text-secondary font-bold group-hover:text-primary">
      {{ mediaData.name }}
    </h3>

    <div class="flex justify-between text-slate-100 mt-auto">
      <p v-if="mediaData.vote_average">{{ mediaData.vote_average }} rate</p>
      <p v-if="mediaData.release_date">{{ mediaData.release_date }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { AdaptedRecommendation } from '@shared/types';
import { generateImgPath } from '@/shared/utils';
import notFind from '@/assets/img/not-found.webp';

interface Props {
  mediaData: AdaptedRecommendation;
}

defineProps<Props>();

const emit = defineEmits<{
  click: [];
}>();
</script>
