interface BaseRecommendation {
  adult: boolean;
  id: number;
  popularity: number;
}

interface BaseMedia extends BaseRecommendation {
  original_language: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  genre_ids: number[];
  vote_average: number;
  vote_count: number;
}

export interface Movie extends BaseMedia {
  title: string;
  original_title: string;
  release_date: string;
  video: boolean;
}

export interface Tv extends BaseMedia {
  name: string;
  original_name: string;
  first_air_date: string;
  origin_country: string[];
}

export type MovieOrTv = Movie | Tv;

export interface Person extends BaseRecommendation {
  gender: number;
  known_for_department: string;
  name: string;
  original_name: string;
  profile_path: string | null;
  known_for: MovieOrTv[];
}

export interface Response<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export type MovieResponse = Response<Movie>;
export type TvResponse = Response<Tv>;
export type PersonResponse = Response<Person>;
export type Recommendation = MovieOrTv | Person;
export type RecommendationResponse = MovieResponse | TvResponse | PersonResponse;
