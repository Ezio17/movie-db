<template>
  <div v-if="detailsAdapted" class="wrap mt-10 h-full">
    <MediaDetails :details="detailsAdapted" :trailer="trailers?.results?.[0]" />

    <Recommendation
      v-if="hasPersons"
      class="mt-20"
      :recommendation="persons"
      :title="$t('Actors')"
      :is-view-all="false"
    />

    <Recommendation
      v-if="hasSimilar"
      class="mt-20"
      :recommendation="similar.results"
      :title="$t('Similar')"
      :is-view-all="false"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, watchEffect } from 'vue';
import { useSeoMeta } from 'nuxt/app';
import { useRoute, navigateTo } from '#app';
import { MediaDetails, adaptDetails } from '@/widgets/MediaDetails';
import { Recommendation } from '@/widgets/Recommendation';
import { useMediaDetails } from './composables';

definePageMeta({
  middleware: ['media-check-params'],
});

const route = useRoute();

const id = computed(() => route.query.id as string);
const mediaType = computed(() => route.params.mediaType as 'movie' | 'tv');

const { trailers, persons, details, similar } = await useMediaDetails(id, mediaType);

const detailsAdapted = computed(() => {
  try {
    return adaptDetails(details.value);
  } catch {
    return null;
  }
});

watchEffect(() => {
  if (!detailsAdapted.value) {
    navigateTo('/');
  } else {
    useSeoMeta({
      title: `Movie DB | ${detailsAdapted.value.title}`,
      description: detailsAdapted.value.overview,
    });
  }
});

const hasPersons = computed(() => persons.value.length);
const hasSimilar = computed(() => similar.value.results.length);
</script>
