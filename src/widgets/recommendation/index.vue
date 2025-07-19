<template>
  <div>
    <TitleWrapper>{{ title }}</TitleWrapper>
    <div class="grid grid-cols-[repeat(auto-fill,185px)] justify-center gap-x-6 gap-y-10 mt-12">
      <MovieCard v-for="movie of movies" :key="movie.id" :movie="movie" @click="handleRedirect" />

      <ViewMoreCard />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { MovieResponse, TvShowResponse } from '@shared/types';
import MovieCard from '@/shared/components/MovieCard/MovieCard.vue';
import { ViewMoreCard } from './components';

interface Props {
  movies: (MovieResponse | TvShowResponse)['results'];
  title: string;
}

defineProps<Props>();

function handleRedirect() {
  // add content
}
</script>
