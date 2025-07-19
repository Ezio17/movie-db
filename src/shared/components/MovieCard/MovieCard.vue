<template>
  <div class="w-[185px] flex flex-col gap-3 cursor-pointer group" @click="emit('click')">
    <img
      v-if="movie.poster_path"
      :src="`https://image.tmdb.org/t/p/w185${movie.poster_path}`"
      alt="poster"
      class="h-[278px]"
    />
    <img v-else :src="notFind" alt="No image" class="h-[278px]" />

    <h3 class="text-lg leading-snug text-secondary font-bold group-hover:text-primary">
      {{ title }}
    </h3>

    <div class="flex justify-between text-slate-100 mt-auto">
      <p v-if="movie.vote_average">{{ movie.vote_average }} rate</p>
      <p v-if="releaseDate">{{ releaseDate }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { MovieOrTvShow } from '@shared/types';
import { isMovie } from '@shared/utils';
import notFind from '@/assets/img/not-found.webp';

interface Props {
  movie: MovieOrTvShow;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  click: [];
}>();

const title = computed(() => {
  return isMovie(props.movie) ? props.movie.title : props.movie.name;
});

const releaseDate = computed(() => {
  return isMovie(props.movie) ? props.movie.release_date : props.movie.first_air_date;
});
</script>
