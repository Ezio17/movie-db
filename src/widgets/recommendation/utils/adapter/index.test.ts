import { describe, it, expect, vi, beforeEach } from 'vitest';
import { isMovie, isTv, isPerson } from '@shared/utils';
import { adaptRecommendation } from './index';
import type { Movie, Tv, Person } from '@/shared/types';

vi.mock('@shared/utils', () => ({
  isMovie: vi.fn(),
  isTv: vi.fn(),
  isPerson: vi.fn(),
}));

const mockIsMovie = vi.mocked(isMovie);
const mockIsTv = vi.mocked(isTv);
const mockIsPerson = vi.mocked(isPerson);

describe('adaptRecommendation', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should adapt movie recommendation correctly', () => {
    const movieData: Movie = {
      adult: false,
      id: 1,
      popularity: 100,
      original_language: 'en',
      overview: 'Test movie overview',
      poster_path: '/test-movie.jpg',
      backdrop_path: '/backdrop.jpg',
      genre_ids: [28, 12],
      vote_average: 8.5,
      vote_count: 1000,
      title: 'Test Movie',
      original_title: 'Original Test Movie',
      release_date: '2024-01-01',
      video: false,
    };

    mockIsMovie.mockReturnValue(true);
    mockIsTv.mockReturnValue(false);
    mockIsPerson.mockReturnValue(false);

    const result = adaptRecommendation(movieData);

    expect(result).toEqual({
      id: 1,
      name: 'Test Movie',
      type: 'movie',
      poster_path: '/test-movie.jpg',
      vote_average: 8.5,
      release_date: '2024-01-01',
    });
  });

  it('should adapt TV show recommendation correctly', () => {
    const tvData: Tv = {
      adult: false,
      id: 2,
      popularity: 85,
      original_language: 'en',
      overview: 'Test TV show overview',
      poster_path: '/test-tv.jpg',
      backdrop_path: '/tv-backdrop.jpg',
      genre_ids: [18, 10765],
      vote_average: 9.2,
      vote_count: 500,
      name: 'Test TV Show',
      original_name: 'Original TV Show',
      first_air_date: '2023-05-15',
      origin_country: ['US'],
    };

    mockIsMovie.mockReturnValue(false);
    mockIsTv.mockReturnValue(true);
    mockIsPerson.mockReturnValue(false);

    const result = adaptRecommendation(tvData);

    expect(result).toEqual({
      id: 2,
      name: 'Test TV Show',
      type: 'tv',
      poster_path: '/test-tv.jpg',
      vote_average: 9.2,
      release_date: '2023-05-15',
    });
  });

  it('should adapt person recommendation correctly', () => {
    const personData: Person = {
      adult: false,
      id: 3,
      popularity: 50,
      gender: 1,
      known_for_department: 'Acting',
      name: 'Test Actor',
      original_name: 'Original Actor Name',
      profile_path: '/test-actor.jpg',
      known_for: [],
    };

    mockIsMovie.mockReturnValue(false);
    mockIsTv.mockReturnValue(false);
    mockIsPerson.mockReturnValue(true);

    const result = adaptRecommendation(personData);

    expect(result).toEqual({
      id: 3,
      name: 'Test Actor',
      type: 'person',
      poster_path: '/test-actor.jpg',
    });
  });

  it('should handle movie with null poster_path', () => {
    const movieData: Movie = {
      adult: false,
      id: 5,
      popularity: 30,
      original_language: 'fr',
      overview: 'Movie without poster',
      poster_path: null,
      backdrop_path: null,
      genre_ids: [35],
      vote_average: 6.0,
      vote_count: 250,
      title: 'Movie Without Poster',
      original_title: 'Film Sans Affiche',
      release_date: '2023-12-01',
      video: false,
    };

    mockIsMovie.mockReturnValue(true);
    mockIsTv.mockReturnValue(false);
    mockIsPerson.mockReturnValue(false);

    const result = adaptRecommendation(movieData);

    expect(result).toEqual({
      id: 5,
      name: 'Movie Without Poster',
      type: 'movie',
      poster_path: null,
      vote_average: 6.0,
      release_date: '2023-12-01',
    });
  });

  it('should handle TV show with empty first_air_date', () => {
    const tvData: Tv = {
      adult: false,
      id: 6,
      popularity: 15,
      original_language: 'es',
      overview: 'TV show without air date',
      poster_path: '/tv-poster.jpg',
      backdrop_path: null,
      genre_ids: [10759],
      vote_average: 7.5,
      vote_count: 100,
      name: 'TV Show',
      original_name: 'Serie de TV',
      first_air_date: '',
      origin_country: ['ES'],
    };

    mockIsMovie.mockReturnValue(false);
    mockIsTv.mockReturnValue(true);
    mockIsPerson.mockReturnValue(false);

    const result = adaptRecommendation(tvData);

    expect(result).toEqual({
      id: 6,
      name: 'TV Show',
      type: 'tv',
      poster_path: '/tv-poster.jpg',
      vote_average: 7.5,
      release_date: '',
    });
  });

  it('should handle person with null profile_path', () => {
    const personData: Person = {
      adult: false,
      id: 7,
      popularity: 25,
      gender: 2,
      known_for_department: 'Directing',
      name: 'Director Without Photo',
      original_name: 'Director Sin Foto',
      profile_path: null,
      known_for: [],
    };

    mockIsMovie.mockReturnValue(false);
    mockIsTv.mockReturnValue(false);
    mockIsPerson.mockReturnValue(true);

    const result = adaptRecommendation(personData);

    expect(result).toEqual({
      id: 7,
      name: 'Director Without Photo',
      type: 'person',
      poster_path: null,
    });
  });

  it('should handle movie with zero vote_average', () => {
    const movieData: Movie = {
      adult: false,
      id: 8,
      popularity: 5,
      original_language: 'de',
      overview: 'Unrated movie',
      poster_path: '/unrated.jpg',
      backdrop_path: null,
      genre_ids: [99],
      vote_average: 0,
      vote_count: 0,
      title: 'Unrated Movie',
      original_title: 'Unbewertet Film',
      release_date: '2024-01-01',
      video: false,
    };

    mockIsMovie.mockReturnValue(true);
    mockIsTv.mockReturnValue(false);
    mockIsPerson.mockReturnValue(false);

    const result = adaptRecommendation(movieData);

    expect(result.vote_average).toBe(0);
    expect(result.name).toBe('Unrated Movie');
  });

  it('should preserve original id for all recommendation types', () => {
    const movieData: Movie = {
      adult: false,
      id: 100,
      popularity: 50,
      original_language: 'en',
      overview: 'Test movie',
      poster_path: '/test.jpg',
      backdrop_path: null,
      genre_ids: [28],
      vote_average: 7.0,
      vote_count: 100,
      title: 'Test Movie',
      original_title: 'Test Movie',
      release_date: '2024-01-01',
      video: false,
    };

    const tvData: Tv = {
      adult: false,
      id: 200,
      popularity: 60,
      original_language: 'en',
      overview: 'Test TV',
      poster_path: '/test-tv.jpg',
      backdrop_path: null,
      genre_ids: [18],
      vote_average: 8.0,
      vote_count: 200,
      name: 'Test TV Show',
      original_name: 'Test TV Show',
      first_air_date: '2024-01-01',
      origin_country: ['US'],
    };

    const personData: Person = {
      adult: false,
      id: 300,
      popularity: 40,
      gender: 1,
      known_for_department: 'Acting',
      name: 'Test Person',
      original_name: 'Test Person',
      profile_path: '/test-person.jpg',
      known_for: [],
    };

    // Test movie
    mockIsMovie.mockReturnValue(true);
    mockIsTv.mockReturnValue(false);
    mockIsPerson.mockReturnValue(false);

    let result = adaptRecommendation(movieData);

    expect(result.id).toBe(100);

    // Test TV
    mockIsMovie.mockReturnValue(false);
    mockIsTv.mockReturnValue(true);
    mockIsPerson.mockReturnValue(false);

    result = adaptRecommendation(tvData);
    expect(result.id).toBe(200);

    // Test person
    mockIsMovie.mockReturnValue(false);
    mockIsTv.mockReturnValue(false);
    mockIsPerson.mockReturnValue(true);

    result = adaptRecommendation(personData);
    expect(result.id).toBe(300);
  });

  it('should call TV check only when movie check fails', () => {
    const tvData: Tv = {
      adult: false,
      id: 12,
      popularity: 30,
      original_language: 'en',
      overview: 'Test TV',
      poster_path: '/test-tv.jpg',
      backdrop_path: null,
      genre_ids: [18],
      vote_average: 7.0,
      vote_count: 150,
      name: 'Test TV Show',
      original_name: 'Test TV Show',
      first_air_date: '2024-02-01',
      origin_country: ['US'],
    };

    mockIsMovie.mockReturnValue(false);
    mockIsTv.mockReturnValue(true);
    mockIsPerson.mockReturnValue(true);

    const result = adaptRecommendation(tvData);

    expect(mockIsMovie).toHaveBeenCalledWith(tvData);
    expect(mockIsTv).toHaveBeenCalledWith(tvData);
    expect(mockIsPerson).not.toHaveBeenCalled();
    expect(result.type).toBe('tv');
  });

  it('should correctly map profile_path to poster_path for persons', () => {
    const personData: Person = {
      adult: false,
      id: 12,
      popularity: 60,
      gender: 1,
      known_for_department: 'Acting',
      name: 'Famous Actor',
      original_name: 'Famous Actor',
      profile_path: '/famous-actor.jpg',
      known_for: [],
    };

    mockIsMovie.mockReturnValue(false);
    mockIsTv.mockReturnValue(false);
    mockIsPerson.mockReturnValue(true);

    const result = adaptRecommendation(personData);

    expect(result.poster_path).toBe('/famous-actor.jpg');
  });
});
