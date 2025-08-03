import { ref, watch, type ComputedRef } from 'vue';
import { useCredits, useSimilar } from '@shared/api';
import type {
  TrailerResponse,
  Person,
  Response,
  Tv,
  Movie,
  MovieDetailsResponse,
  TvDetailsResponse,
} from '@shared/types';
import { useTrailers, useDetails } from '@/widgets/MediaDetails';

export const useMediaDetails = async (
  id: ComputedRef<string>,
  mediaType: ComputedRef<'movie' | 'tv'>
) => {
  const details = ref<MovieDetailsResponse | TvDetailsResponse | null>(null);
  const trailers = ref<TrailerResponse | null>(null);
  const persons = ref<Person[]>([]);
  const similar = ref<Response<Tv | Movie>>({
    results: [],
    page: 1,
    total_pages: 1,
    total_results: 0,
  });

  const load = async () => {
    if (!id.value || !mediaType.value) return;

    const [detailsResult, trailersResult, personsResult, similarResult] = await Promise.all([
      useDetails(id.value, mediaType.value),
      useTrailers(id.value, mediaType.value),
      useCredits(id.value, mediaType.value),
      useSimilar(id.value, mediaType.value),
    ]);

    details.value = detailsResult.data.value;
    trailers.value = trailersResult.data.value;
    persons.value = personsResult.data.value;
    similar.value = similarResult.data.value;

    if (process.client) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  await load();

  watch([id, mediaType], async () => {
    await load();
  });

  return {
    trailers,
    persons,
    details,
    similar,
  };
};
