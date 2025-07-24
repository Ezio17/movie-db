<template>
  <div class="wrap mt-10 h-full">
    <MediaDetails :details="detailsAdapted" :trailer="trailers?.results[0]" />
  </div>
</template>

<script setup lang="ts">
import { computed, watchEffect } from 'vue';
import { adaptDetails } from '@widgets/MediaDetails/utils';
import { useDetails, useTrailers } from '@widgets/MediaDetails/api';
import { useRoute, useRouter } from '#app';
import { MediaDetails } from '@/widgets/MediaDetails';

const {
  query: { id },
} = useRoute();
const router = useRouter();

const { data: trailers } = useTrailers(id, 'tv');
const { data: details } = await useDetails(id, 'tv');

const detailsAdapted = computed(() => {
  try {
    return adaptDetails(details.value);
  } catch {
    return null;
  }
});

watchEffect(() => {
  if (!detailsAdapted.value) {
    router.push('/');
  }
});
</script>
