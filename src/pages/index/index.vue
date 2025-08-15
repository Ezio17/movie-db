<template>
  <Slider :movies="sliderMovies" />

  <section v-for="{ title, recommendation, endpoint } of recommendations" :key="title">
    <Recommendation
      v-if="recommendation.length"
      :recommendation="recommendation"
      :title="title"
      :endpoint="endpoint"
      class="wrap mt-20"
    />
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import type { MovieOrTv, Tv, Movie, Person } from '@shared/types';
import { Recommendation, useRecommendations } from '@widgets/Recommendation';
import { Slider } from './widgets/slider';

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
    endpoint: 'popular',
  },
  {
    title: t('Top rated'),
    recommendation: topRatedMovie.value.results,
    endpoint: 'top_rated',
  },
  {
    title: t('Serial'),
    recommendation: topRatedSeries.value.results,
    endpoint: 'top_rated',
  },
  {
    title: t('Currently watching'),
    recommendation: popularSeries.value.results,
    endpoint: 'popular',
  },
  {
    title: t('Actors'),
    recommendation: person.value.results,
    endpoint: 'popular',
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
