<template>
  <div>
    <TitleWrapper>{{ title }}</TitleWrapper>

    <div class="grid grid-cols-[repeat(auto-fill,185px)] justify-center gap-x-6 gap-y-10 mt-12">
      <MediaCard
        v-for="mediaData of adaptedRecommendation"
        :key="mediaData.id"
        :media-data="mediaData"
        @click="handleRedirect(mediaData)"
      />

      <ViewMoreCard />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { Recommendation, AdaptedRecommendation } from '@shared/types';
import MediaCard from '@/shared/components/MediaCard/MediaCard.vue';
import { ViewMoreCard } from './components';
import { adaptRecommendation } from './utils';
import { useRouter } from '#app';

interface Props {
  recommendation: Recommendation[];
  title: string;
}

const props = defineProps<Props>();

const router = useRouter();

function handleRedirect({ type, id }: AdaptedRecommendation) {
  router.push({ name: type, query: { id } });
}

const adaptedRecommendation = computed(() => {
  return props.recommendation.map(adaptRecommendation);
});
</script>
