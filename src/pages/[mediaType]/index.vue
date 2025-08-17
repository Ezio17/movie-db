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
          placeholder="Select"
          class="w-full sm:w-[300px] mt-14"
      /></template>
    </Recommendation>
  </div>
</template>

<script setup lang="ts">
import { computed, watchEffect, ref } from 'vue';
import { Recommendation, useRecommendations } from '@widgets/Recommendation';
import type {
  MediaTypeMap,
  MediaType,
  RecommendationResponse,
  Recommendation as RecommendationType,
} from '@shared/types';
import type { List } from './types';
import { showError, createError, useRoute } from '#app';
import { useList, useDiscover } from './api';
import { useQueryParam } from './composables';

// Базова ініціалізація
type MediaWithoutPerson = Omit<MediaTypeMap, 'person'>[Exclude<MediaType, 'person'>];

const route = useRoute();

const { endpoint, genre: genreQuery } = route.query as {
  endpoint: string | undefined;
  genre?: string | undefined;
};

const mediaType = computed(() => route.params.mediaType as 'movie' | 'tv' | 'person');
const isPerson = computed(() => mediaType.value === 'person');

const MEDIA_TYPES = ['movie', 'tv', 'person'];

watchEffect(() => {
  if (!MEDIA_TYPES.includes(mediaType.value) || !endpoint) {
    throw showError(createError({ statusMessage: 'Page not found.', statusCode: 404 }));
  }
});

// Загальна робота над медіа
const mediaData = ref<RecommendationType[]>([]);
const page = ref(1);

const showMovies = computed(() => !!mediaData?.value?.length);
const setValues = (data: RecommendationResponse) => {
  mediaData.value = data.results;
  page.value = data.page || 1;
};

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

useQueryParam('genres', genre);

watchEffect(async () => {
  if (genre.value) {
    const { data: discoverMovies } = await useDiscover<MediaWithoutPerson>(
      mediaType.value,
      genre.value
    );

    if (discoverMovies.value) {
      setValues(discoverMovies.value);
    }
  } else {
    const { data: movies } = await useRecommendations<MediaTypeMap[MediaType]>(
      `/api/${mediaType.value}/${endpoint}`
    );

    if (movies.value) {
      setValues(movies.value);
    }
  }
});
</script>
