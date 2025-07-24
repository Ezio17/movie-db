export interface AdaptedRecommendation {
  id: number;
  name: string;
  type: 'tv' | 'movie' | 'person';
  poster_path: string | null;
  release_date?: string;
  vote_average?: number;
}
export interface AdaptedDetails {
  id: number;
  type: 'movie' | 'tv';
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  genres: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  production_companies: string;
  production_countries: string;
  runtime: number | null;
  status: string;
  tagline: string;
}
