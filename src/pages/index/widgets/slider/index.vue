<template>
  <div class="relative w-full">
    <Splide v-if="moviesWithPoster.length" :options="defaultOptions">
      <SplideSlide v-for="(movie, index) of moviesWithPoster" :key="movie.id">
        <div class="h-[50vh] md:h-[calc(100vh-var(--header-height))]">
          <img
            v-bind="
              !index
                ? { src: generateImgPath('original', movie.backdrop_path) }
                : { 'data-splide-lazy': generateImgPath('original', movie.backdrop_path) }
            "
            sizes="(max-width: 640px) 300px, (max-width: 1024px) 780px, 1280px"
            class="absolute inset-0 w-full h-full object-cover object-center"
            alt="movie"
          />
          <div
            class="absolute bottom-6 md:bottom-14 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-black bg-opacity-50 rounded-md max-w-[90vw] md:max-w-[60%] shadow-lg"
          >
            <NuxtLink
              to="#"
              class="text-primary text-center text-base md:text-3xl font-semibold drop-shadow-md"
              >{{ getTitle(movie) }}</NuxtLink
            >
          </div>
        </div>
      </SplideSlide>
    </Splide>
  </div>
</template>

<script setup lang="ts">
import { Splide, SplideSlide } from '@splidejs/vue-splide';
import { computed } from 'vue';
import '@splidejs/vue-splide/css';
import type { MovieOrTv } from '@shared/types';
import { isMovie, generateImgPath } from '@shared/utils';

interface Props {
  movies: MovieOrTv[];
}

const props = defineProps<Props>();

const defaultOptions = {
  type: 'loop' as const,
  perPage: 1,
  autoplay: true,
  interval: 5000,
  arrows: true,
  pauseOnHover: false,
  pagination: false,
  lazyLoad: 'sequential',
  speed: 2500,
};

const moviesWithPoster = computed(() => {
  return props.movies.filter(
    (movie: MovieOrTv): movie is MovieOrTv & { backdrop_path: string } => !!movie.backdrop_path
  );
});

const getTitle = (movie: MovieOrTv) => {
  if (isMovie(movie)) {
    return movie.title;
  }

  return movie.name;
};
</script>

<style lang="scss" scoped>
:deep(.splide__arrow) {
  top: 50% !important;
  transform: translateY(-50%);
  background-color: white;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
}
</style>
