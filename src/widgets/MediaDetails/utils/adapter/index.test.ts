import { describe, it, expect } from 'vitest';
import type { MovieDetailsResponse, TvDetailsResponse } from '@shared/types';
import adaptDetails from './index';

const createMockMovie = (overrides: Partial<MovieDetailsResponse> = {}): MovieDetailsResponse => ({
  id: 1,
  title: 'Test Movie',
  overview: 'Test overview',
  poster_path: '/poster.jpg',
  backdrop_path: '/backdrop.jpg',
  release_date: '2024-01-01',
  runtime: 120,
  genres: [
    { id: 1, name: 'Action' },
    { id: 2, name: 'Drama' },
  ],
  production_companies: [
    {
      id: 1,
      name: 'Test Studios',
      logo_path: '/logo.jpg',
      origin_country: 'US',
    },
  ],
  production_countries: [{ iso_3166_1: 'US', name: 'USA' }],
  vote_average: 8.5,
  vote_count: 1000,
  status: 'Released',
  tagline: 'Test tagline',
  adult: false,
  belongs_to_collection: '',
  budget: 50000000,
  homepage: 'https://example.com',
  imdb_id: 'tt1234567',
  original_language: 'en',
  original_title: 'Test Movie',
  popularity: 100.5,
  revenue: 150000000,
  spoken_languages: [{ english_name: 'English', iso_639_1: 'en', name: 'English' }],
  video: false,
  ...overrides,
});

const createMockTv = (overrides: Partial<TvDetailsResponse> = {}): TvDetailsResponse => ({
  id: 1,
  original_name: 'Test TV Show',
  overview: 'Test overview',
  poster_path: '/poster.jpg',
  backdrop_path: '/backdrop.jpg',
  first_air_date: '2024-01-01',
  episode_run_time: [45],
  genres: [
    { id: 1, name: 'Drama' },
    { id: 2, name: 'Thriller' },
  ],
  production_companies: [
    {
      id: 1,
      name: 'Test TV Studios',
      logo_path: '/logo.jpg',
      origin_country: 'UK',
    },
  ],
  production_countries: [{ iso_3166_1: 'GB', name: 'UK' }],
  vote_average: 9.0,
  vote_count: 500,
  status: 'Returning Series',
  tagline: 'Test TV tagline',
  adult: false,
  created_by: [],
  homepage: 'https://example-tv.com',
  in_production: true,
  languages: ['en'],
  last_air_date: '2024-02-01',
  last_episode_to_air: {
    id: 1,
    name: 'Episode 1',
    overview: 'First episode',
    vote_average: 8.0,
    vote_count: 100,
    air_date: '2024-01-01',
    episode_number: 1,
    production_code: 'E01',
    runtime: 45,
    season_number: 1,
    show_id: 1,
    still_path: '/still.jpg',
  },
  next_episode_to_air: null,
  networks: [],
  number_of_episodes: 10,
  number_of_seasons: 1,
  origin_country: ['GB'],
  original_language: 'en',
  popularity: 80.0,
  seasons: [],
  spoken_languages: [{ english_name: 'English', iso_639_1: 'en', name: 'English' }],
  type: 'Scripted',
  ...overrides,
});

const createInvalidData = () => ({
  id: 1,
  some_random_field: 'invalid',
});

describe('adaptDetails', () => {
  it('should throw error when null data provided', () => {
    expect(() => adaptDetails(null)).toThrow('No data provided');
  });

  it('should throw error when data does not match movie or TV type', () => {
    const invalidData = createInvalidData();

    expect(() =>
      adaptDetails(invalidData as unknown as MovieDetailsResponse | TvDetailsResponse)
    ).toThrow('Unknown media type');
  });

  it('should correctly adapt movie data with runtime', () => {
    const movieData = createMockMovie({ runtime: 150 });
    const result = adaptDetails(movieData);

    expect(result).toEqual({
      id: 1,
      type: 'movie',
      title: 'Test Movie',
      overview: 'Test overview',
      poster_path: '/poster.jpg',
      backdrop_path: '/backdrop.jpg',
      release_date: '2024-01-01',
      runtime: 150,
      genres: 'Action, Drama',
      production_companies: 'Test Studios',
      production_countries: 'USA',
      vote_average: 8.5,
      vote_count: 1000,
      status: 'Released',
      tagline: 'Test tagline',
    });
  });

  it('should correctly adapt movie data without runtime', () => {
    const movieData = createMockMovie({ runtime: undefined });
    const result = adaptDetails(movieData);

    expect(result.runtime).toBeNull();
    expect(result.type).toBe('movie');
  });

  it('should correctly adapt TV data with episode runtime', () => {
    const tvData = createMockTv({ episode_run_time: [60] });
    const result = adaptDetails(tvData);

    expect(result).toEqual({
      id: 1,
      type: 'tv',
      title: 'Test TV Show',
      overview: 'Test overview',
      poster_path: '/poster.jpg',
      backdrop_path: '/backdrop.jpg',
      release_date: '2024-01-01',
      runtime: 60,
      genres: 'Drama, Thriller',
      production_companies: 'Test TV Studios',
      production_countries: 'UK',
      vote_average: 9.0,
      vote_count: 500,
      status: 'Returning Series',
      tagline: 'Test TV tagline',
    });
  });

  it('should correctly adapt TV data without episode runtime', () => {
    const tvData = createMockTv({ episode_run_time: [] });
    const result = adaptDetails(tvData);

    expect(result.runtime).toBeNull();
    expect(result.type).toBe('tv');
  });

  it('should correctly map genres array to comma-separated string', () => {
    const movieData = createMockMovie({
      genres: [
        { id: 1, name: 'Action' },
        { id: 2, name: 'Comedy' },
        { id: 3, name: 'Drama' },
      ],
    });
    const result = adaptDetails(movieData);

    expect(result.genres).toBe('Action, Comedy, Drama');
  });

  it('should correctly map production companies array to comma-separated string', () => {
    const movieData = createMockMovie({
      production_companies: [
        {
          id: 1,
          name: 'Warner Bros',
          logo_path: '/wb.jpg',
          origin_country: 'US',
        },
        {
          id: 2,
          name: 'Universal Studios',
          logo_path: '/universal.jpg',
          origin_country: 'US',
        },
      ],
    });
    const result = adaptDetails(movieData);

    expect(result.production_companies).toBe('Warner Bros, Universal Studios');
  });

  it('should correctly map production countries array to comma-separated string', () => {
    const movieData = createMockMovie({
      production_countries: [
        { iso_3166_1: 'US', name: 'United States' },
        { iso_3166_1: 'CA', name: 'Canada' },
      ],
    });
    const result = adaptDetails(movieData);

    expect(result.production_countries).toBe('United States, Canada');
  });

  it('should handle empty arrays for genres, companies, and countries', () => {
    const movieData = createMockMovie({
      genres: [],
      production_companies: [],
      production_countries: [],
    });
    const result = adaptDetails(movieData);

    expect(result.genres).toBe('');
    expect(result.production_companies).toBe('');
    expect(result.production_countries).toBe('');
  });

  it('should use original_name as title for TV shows', () => {
    const tvData = createMockTv({ original_name: 'Breaking Bad' });
    const result = adaptDetails(tvData);

    expect(result.title).toBe('Breaking Bad');
  });

  it('should use first_air_date as release_date for TV shows', () => {
    const tvData = createMockTv({ first_air_date: '2023-05-15' });
    const result = adaptDetails(tvData);

    expect(result.release_date).toBe('2023-05-15');
  });
});
