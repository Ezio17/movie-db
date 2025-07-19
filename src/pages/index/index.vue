<template>
  <Slider :movies="sliderMovies" />

  <section v-for="{ title, movies } of recommendations" :key="title">
    <Recommendation v-if="movies.length" :movies="movies" :title="title" class="wrap mt-14" />
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import type { MovieOrTvShow } from '@shared/types';
import { Recommendation } from '@widgets/recommendation/index';
import { Slider } from './widgets/slider';
import { useMoviesOrTvShows } from './api';

const { data: popularMovie } = useMoviesOrTvShows<'movie'>('/api/movie/popular');
const { data: topRatedMovie } = useMoviesOrTvShows<'movie'>('/api/movie/top_rated');
const { data: upcoming } = useMoviesOrTvShows<'movie'>('/api/movie/upcoming');
const { data: topRatedSeries } = useMoviesOrTvShows<'tv'>('/api/tv/top_rated');
const { data: popularSeries } = useMoviesOrTvShows<'tv'>('/api/tv/popular');

const { t } = useI18n();

const recommendations = computed(() => [
  {
    title: t('Popular'),
    movies: popularMovie.value.results,
  },
  {
    title: t('Top rated'),
    movies: topRatedMovie.value.results,
  },
  {
    title: t('New releases'),
    movies: upcoming.value.results,
  },
  {
    title: t('Serial'),
    movies: topRatedSeries.value.results,
  },
  {
    title: t('Currently watching'),
    movies: popularSeries.value.results,
  },
]);

const sliderMovies = computed(() => {
  return recommendations.value.flatMap(
    (recommendation) => recommendation.movies.slice(0, 2) as MovieOrTvShow[]
  );
});
</script>
