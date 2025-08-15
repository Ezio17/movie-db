<template>
  <div>
    <TitleWrapper>{{ title }}</TitleWrapper>

    <div class="grid grid-cols-[repeat(auto-fill,185px)] justify-center gap-x-6 gap-y-10 mt-12">
      <MediaCard
        v-for="mediaData of adaptedRecommendation"
        :key="mediaData.id"
        :media-data="mediaData"
        @click="handleRedirectDetails(mediaData)"
      />

      <ViewMoreCard v-if="isViewAll" @click="handleRedirectAll" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { Recommendation, AdaptedRecommendation } from '@shared/types';
import { MediaCard } from '@shared/components';
import { ViewMoreCard } from './components';
import { adaptRecommendation } from './utils';
import { navigateTo } from '#app';

interface Props {
  recommendation: Recommendation[];
  title: string;
  endpoint?: string;
  isViewAll?: boolean;
}

const props = withDefaults(defineProps<Props>(), { isViewAll: true, endpoint: '' });

const adaptedRecommendation = computed(() => {
  return props.recommendation.map(adaptRecommendation);
});

const type = computed(() => adaptedRecommendation.value?.[0]?.type);

function handleRedirectDetails({ id }: AdaptedRecommendation) {
  if (type.value === 'person') {
    navigateTo({ name: type.value, query: { id } });

    return;
  }

  navigateTo({ path: `/details/${type.value}`, query: { id } });
}

function handleRedirectAll() {
  navigateTo({ path: `${type.value}`, query: { endpoint: props.endpoint } });
}
</script>
