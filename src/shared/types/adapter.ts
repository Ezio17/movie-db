export type AdaptedRecommendation = {
  id: number;
  type: 'tv' | 'movie' | 'person';
  vote_average: number | null;
  poster_path: string | null;
  release_date: string | null;
  name: string;
};
