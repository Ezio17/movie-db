import { describe, it, expect } from 'vitest';
import type { Recommendation, Movie, Tv, Person } from '@shared/types';
import { isMovie, isTv, isPerson } from './index';

describe('Type Guards', () => {
  const mockMovie: Movie = {
    id: 1,
    title: 'Test Movie',
    poster_path: '/test-poster.jpg',
    release_date: '2024-01-15',
    vote_average: 8.5,
  } as Movie;

  const mockTv: Tv = {
    id: 2,
    name: 'Test TV Show',
    first_air_date: '2024-03-20',
    poster_path: '/test-tv-poster.jpg',
    vote_average: 9.2,
  } as Tv;

  const mockPerson: Person = {
    id: 3,
    name: 'Test Actor',
    profile_path: '/test-person.jpg',
    gender: 1,
  } as Person;

  describe('isMovie', () => {
    it('should return true for movie object', () => {
      expect(isMovie(mockMovie)).toBe(true);
    });

    it('should return false for TV show object', () => {
      expect(isMovie(mockTv)).toBe(false);
    });

    it('should return false for person object', () => {
      expect(isMovie(mockPerson)).toBe(false);
    });
  });

  describe('isTv', () => {
    it('should return true for TV show object', () => {
      expect(isTv(mockTv)).toBe(true);
    });

    it('should return false for movie object', () => {
      expect(isTv(mockMovie)).toBe(false);
    });

    it('should return false for person object', () => {
      expect(isTv(mockPerson)).toBe(false);
    });
  });

  describe('isPerson', () => {
    it('should return true for person object', () => {
      expect(isPerson(mockPerson)).toBe(true);
    });

    it('should return false for movie object', () => {
      expect(isPerson(mockMovie)).toBe(false);
    });

    it('should return false for TV show object', () => {
      expect(isPerson(mockTv)).toBe(false);
    });
  });

  describe('edge cases', () => {
    it('should handle objects without key properties', () => {
      const emptyObject = {} as Recommendation;

      expect(isMovie(emptyObject)).toBe(false);
      expect(isTv(emptyObject)).toBe(false);
      expect(isPerson(emptyObject)).toBe(false);
    });

    it('should be mutually exclusive', () => {
      expect(isMovie(mockMovie) && isTv(mockMovie)).toBe(false);
      expect(isMovie(mockMovie) && isPerson(mockMovie)).toBe(false);
      expect(isTv(mockTv) && isPerson(mockTv)).toBe(false);
    });
  });
});
