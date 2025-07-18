<template>
  <div
    ref="innerEl"
    class="absolute top-full left-1/2 -translate-x-1/2 xl:left-0 xl:translate-x-0 w-full z-20 max-h-[500px] overflow-auto py-3 bg-white text-gray-900 rounded-b-xl shadow-lg ring-1 ring-black/5"
  >
    <div v-if="pending" class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <Loader />
    </div>

    <div
      v-else-if="errorMessage || !slicedMovies.length"
      data-testid="search-message"
      class="text-center px-4 py-3 text-gray-500 text-xl font-bold"
    >
      {{ errorMessage || $t('no results found') }}
    </div>

    <div v-else class="grid grid-cols-[repeat(auto-fit,_minmax(350px,_1fr))] gap-3">
      <div
        v-for="movie in slicedMovies"
        :key="movie.id"
        data-testid="search-main"
        class="flex justify-between gap-3 px-4 py-3 hover:bg-gray-100 cursor-pointer border-b last:border-b-0"
      >
        <div class="flex flex-col gap-4 justify-between">
          <div class="font-semibold">{{ movie.title }}</div>

          <div>
            <div v-if="movie.release_date" class="mt-4 text-sm text-gray-500">
              {{ $t('release') }}: {{ movie.release_date }}
            </div>

            <div v-if="movie.vote_average" class="text-sm text-gray-500">
              {{ $t('rate') }}: {{ movie.vote_average }}
            </div>
          </div>
        </div>

        <img
          v-if="movie.poster_path"
          :src="`https://image.tmdb.org/t/p/w92${movie.poster_path}`"
          alt="Image"
          class="h-24"
        />
      </div>

      <!-- <div v-if="movies && movies.results.length > showCount" class="p-4 text-center">
        <NuxtLink class="text-secondary text-lg" to="#">{{ $t('show more') }}...</NuxtLink>
      </div> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineExpose, ref } from 'vue';
import type { MovieResponse } from '@shared/types';

interface Props {
  movies: MovieResponse | null;
  pending: boolean;
  errorMessage: string;
}

const props = defineProps<Props>();

// Робота з батьківським віджетом
const innerEl = ref<HTMLElement | null>(null);

defineExpose({ innerEl });

// Обробка фільмів
const showCount = 9;
const slicedMovies = computed(() => (props.movies?.results || []).slice(0, showCount));
</script>
