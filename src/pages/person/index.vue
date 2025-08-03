<template>
  <div class="wrap mt-16">
    <PersonInfo :id="id" />

    <Recommendation
      v-if="hasMovies"
      class="mt-20"
      :recommendation="movies"
      :title="$t('Filmography')"
      :is-view-all="false"
    />
  </div>
</template>

<script setup lang="ts">
import { useRoute, navigateTo } from 'nuxt/app';
import { computed } from 'vue';
import { useMovieCredits } from './api';
import { Recommendation } from '@/widgets/Recommendation';
import { PersonInfo } from './widgets/PersonInfo';

const route = useRoute();

const id = route.query.id as string;

if (!id) {
  navigateTo('/');
}

const { data: movies } = useMovieCredits(id as string);

const hasMovies = computed(() => movies.value?.length);
</script>
