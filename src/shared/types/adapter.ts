export type AdaptedRecommendation = {
  id: number;
  name: string;
  type: 'tv' | 'movie' | 'person';
  poster_path: string | null;
  release_date?: string;
  vote_average?: number;
};
