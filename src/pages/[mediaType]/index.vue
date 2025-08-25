<template>
  <div class="wrap mt-14 px-4">
    <Recommendation
      v-if="showMovies"
      :recommendation="mediaData"
      :title="$t(mediaType)"
      :is-view-all="false"
      class="mt-20"
    >
      <template v-if="showGenresList" #header>
        <Select
          id="genre"
          v-model="genre"
          :options="genresList"
          :placeholder="$t('Select')"
          class="w-full sm:w-[300px] mt-14"
      /></template>
    </Recommendation>

    <div class="mt-20 w-full flex justify-center">
      <Pagination
        :total-pages="totalPages"
        :current-page="currentPage"
        @click-page="(page) => (currentPage = page)"
        @click-next="currentPage += 1"
        @click-prev="currentPage -= 1"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, watchEffect, ref, watch } from 'vue';
import { Recommendation, useRecommendations } from '@widgets/Recommendation';
import type {
  MediaTypeMap,
  MediaType,
  RecommendationResponse,
  Recommendation as RecommendationType,
} from '@shared/types';
import { useSeoMeta } from 'nuxt/app';
import type { List } from './types';
import { showError, createError, useRoute } from '#app';
import { useList, useDiscover } from './api';
import { useQueryParam } from './composables';
import { Pagination } from './components';
import { toCapitalize } from './utils';

// Базова ініціалізація
type MediaWithoutPerson = Omit<MediaTypeMap, 'person'>[Exclude<MediaType, 'person'>];

const route = useRoute();

const {
  endpoint,
  genre: genreQuery,
  page: pageQuery,
} = route.query as {
  endpoint: string | undefined;
  genre?: string | undefined;
  page?: string | undefined;
};

const mediaType = computed(() => route.params.mediaType as 'movie' | 'tv' | 'person');
const isPerson = computed(() => mediaType.value === 'person');

const MEDIA_TYPES = ['movie', 'tv', 'person'];

watchEffect(() => {
  if (!MEDIA_TYPES.includes(mediaType.value) || !endpoint || Number(pageQuery) > 500) {
    throw showError(createError({ statusMessage: 'Page not found.', statusCode: 404 }));
  } else {
    useSeoMeta({
      title: `Movie DB | ${toCapitalize(mediaType.value)}`,
    });
  }
});

// Загальна робота над медіа
const totalPages = ref(500);
const currentPage = ref(Number(pageQuery) || 1);
const mediaData = ref<RecommendationType[]>([]);

useQueryParam('page', currentPage, 100);

const showMovies = computed(() => !!mediaData?.value?.length);
const setValues = (data: RecommendationResponse) => {
  mediaData.value = data.results;
  currentPage.value = data.page || 1;
};

watch(currentPage, () => {
  window.scrollTo({ top: 0 });
});

// Робота над завантаженням даних
const genresList = ref<List[]>([]);

if (!isPerson.value) {
  const { data } = await useList(mediaType.value);

  if (data.value) {
    genresList.value = data.value;
  }
}

const showGenresList = computed(() => !!genresList?.value);

const genre = ref<string>(genreQuery || '');

useQueryParam('genre', genre);

watch(genre, () => {
  currentPage.value = 1;
});

watch(
  [genre, currentPage],
  async () => {
    if (genre.value) {
      const { data: discoverMovies } = await useDiscover<MediaWithoutPerson>(
        mediaType.value,
        genre.value,
        currentPage.value
      );

      if (discoverMovies.value) {
        setValues(discoverMovies.value);
      }
    } else {
      const { data: movies } = await useRecommendations<MediaTypeMap[MediaType]>(
        `/api/${mediaType.value}/${endpoint}`,
        currentPage.value
      );

      if (movies.value) {
        setValues(movies.value);
      }
    }
  },
  { immediate: true }
);
</script>
