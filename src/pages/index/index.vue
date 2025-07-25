<template>
  <Slider :movies="sliderMovies" />

  <section v-for="{ title, recommendation } of recommendations" :key="title">
    <Recommendation
      v-if="recommendation.length"
      :recommendation="recommendation"
      :title="title"
      class="wrap mt-20"
    />
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import type { MovieOrTv, Tv, Movie, Person } from '@shared/types';
import { Recommendation } from '@widgets/Recommendation/index';
import { Slider } from './widgets/slider';
import { useRecommendations } from './api';

const { data: popularMovie } = useRecommendations<Movie>('/api/movie/popular');
const { data: topRatedMovie } = useRecommendations<Movie>('/api/movie/top_rated');
const { data: topRatedSeries } = useRecommendations<Tv>('/api/tv/top_rated');
const { data: popularSeries } = useRecommendations<Tv>('/api/tv/popular');
const { data: person } = useRecommendations<Person>('/api/person/popular');

const { t } = useI18n();

const recommendations = computed(() => [
  {
    title: t('Popular'),
    recommendation: popularMovie.value.results,
  },
  {
    title: t('Top rated'),
    recommendation: topRatedMovie.value.results,
  },
  {
    title: t('Serial'),
    recommendation: topRatedSeries.value.results,
  },
  {
    title: t('Currently watching'),
    recommendation: popularSeries.value.results,
  },
  {
    title: t('Actors'),
    recommendation: person.value.results,
  },
]);

const sliderMovies = computed<MovieOrTv[]>(() => {
  return [
    ...popularMovie.value.results.slice(0, 3),
    ...topRatedMovie.value.results.slice(0, 3),
    ...topRatedSeries.value.results.slice(0, 3),
    ...popularSeries.value.results.slice(0, 3),
  ];
});
</script>
