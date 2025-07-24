<template>
  <div
    v-if="details"
    class="w-full bg-gray-300 rounded-md p-4 sm:p-10 lg:p-6 pb-10 flex flex-col sm:grid gap-8 sm:grid-cols-2 lg:grid-cols-[1fr_2fr] xl:grid-cols-[250px_2fr_2fr] items-center sm:items-start"
  >
    <div>
      <img class="xl:h-[400px]" :src="generateImgPath('w342', details.poster_path)" alt="Poster" />
    </div>

    <div class="col-span-2 xl:col-span-1">
      <Intro :title="details.title" :video-key="trailer?.key" :description="details.overview" />
    </div>

    <div class="row-start-1 col-start-2 xl:col-start-3 xl:col-span-1">
      <MainDetails :details="details" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { AdaptedDetails, Trailer } from '@shared/types';
import { generateImgPath } from '@/shared/utils';
import { MainDetails, Intro } from './components';

interface Props {
  details: AdaptedDetails | null;
  trailer?: Trailer;
}

defineProps<Props>();
</script>
