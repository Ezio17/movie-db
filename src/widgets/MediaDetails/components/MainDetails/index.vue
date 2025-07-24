<template>
  <ul class="flex flex-col gap-4">
    <template v-for="{ title, description } in lists">
      <List v-if="description" :key="title" :title="title" :description="description" />
    </template>
  </ul>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { AdaptedDetails } from '@shared/types';
import { List } from '@widgets/MediaDetails/ui/index';
import { formatMinutesToHours } from '@widgets/MediaDetails/utils';
import { useI18n } from 'vue-i18n';

interface Props {
  details: AdaptedDetails;
}

const props = defineProps<Props>();

const { t } = useI18n();

const runtime = computed(() => {
  return formatMinutesToHours(props.details.runtime || 0, t);
});

const lists = computed(() => {
  const d = props.details;

  return [
    { title: 'release_date', description: d.release_date },
    { title: 'tagline', description: d.tagline },
    { title: 'genres', description: d.genres },
    { title: 'runtime', description: runtime.value },
    { title: 'production_countries', description: d.production_countries },
    { title: 'production_companies', description: d.production_companies },
    { title: 'vote_average', description: d.vote_average },
    { title: 'vote_count', description: d.vote_count },
  ];
});
</script>
