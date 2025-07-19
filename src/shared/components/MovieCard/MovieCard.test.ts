import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import type { Movie, TvShow } from '@shared/types';
import MovieCard from './MovieCard.vue';

vi.mock('@/assets/img/not-found.webp', () => ({
  default: '/mock-not-found.webp',
}));

describe('MovieCard', () => {
  const mockMovie: Movie = {
    id: 1,
    title: 'Test Movie',
    original_title: 'Test Movie Original',
    original_language: 'en',
    overview: 'This is a test movie overview',
    poster_path: '/test-poster.jpg',
    backdrop_path: '/test-backdrop.jpg',
    genre_ids: [28, 12, 16],
    release_date: '2024-01-15',
    vote_average: 8.5,
    vote_count: 1500,
    popularity: 750.5,
    adult: false,
    video: false,
  };

  const mockTvShow: TvShow = {
    id: 2,
    name: 'Test TV Show',
    original_name: 'Test TV Show Original',
    original_language: 'en',
    overview: 'This is a test TV show overview',
    poster_path: '/test-tv-poster.jpg',
    backdrop_path: '/test-tv-backdrop.jpg',
    genre_ids: [18, 35],
    first_air_date: '2024-03-20',
    vote_average: 9.2,
    vote_count: 2000,
    popularity: 850.3,
    adult: false,
    origin_country: ['US'],
  };

  it('renders movie title and data correctly', () => {
    const wrapper = mount(MovieCard, {
      props: { movie: mockMovie },
    });

    expect(wrapper.find('h3').text()).toBe('Test Movie');

    expect(wrapper.find('img').attributes('src')).toBe(
      'https://image.tmdb.org/t/p/w185/test-poster.jpg'
    );
    expect(wrapper.find('img').attributes('alt')).toBe('poster');
    expect(wrapper.text()).toContain('8.5 rate');
    expect(wrapper.text()).toContain('2024-01-15');
  });

  it('renders TV show name and data correctly', () => {
    const wrapper = mount(MovieCard, {
      props: { movie: mockTvShow },
    });

    expect(wrapper.find('h3').text()).toBe('Test TV Show');

    expect(wrapper.find('img').attributes('src')).toBe(
      'https://image.tmdb.org/t/p/w185/test-tv-poster.jpg'
    );
    expect(wrapper.find('img').attributes('alt')).toBe('poster');
    expect(wrapper.text()).toContain('9.2 rate');
    expect(wrapper.text()).toContain('2024-03-20');
  });

  it('displays fallback image when poster_path is null', () => {
    const movieWithNullPoster: Movie = {
      ...mockMovie,
      poster_path: null,
    };

    const wrapper = mount(MovieCard, {
      props: { movie: movieWithNullPoster },
    });

    const img = wrapper.find('img');

    expect(img.attributes('src')).toBe('/mock-not-found.webp');
    expect(img.attributes('alt')).toBe('No image');
  });

  it('displays fallback image when poster_path is undefined', () => {
    const movieWithUndefinedPoster = {
      ...mockMovie,
      poster_path: undefined,
    } as unknown as Movie;

    const wrapper = mount(MovieCard, {
      props: { movie: movieWithUndefinedPoster },
    });

    const img = wrapper.find('img');

    expect(img.attributes('src')).toBe('/mock-not-found.webp');
    expect(img.attributes('alt')).toBe('No image');
  });

  it('hides vote average when it is 0 for movie', () => {
    const movieWithZeroRating: Movie = {
      ...mockMovie,
      vote_average: 0,
    };

    const wrapper = mount(MovieCard, {
      props: { movie: movieWithZeroRating },
    });

    expect(wrapper.text()).not.toContain('rate');
  });

  it('hides release date when it is empty for movie', () => {
    const movieWithoutDate: Movie = {
      ...mockMovie,
      release_date: '',
    };

    const wrapper = mount(MovieCard, {
      props: { movie: movieWithoutDate },
    });

    expect(wrapper.text()).not.toContain('2024-01-15');
  });

  it('hides first air date when it is empty for TV show', () => {
    const tvShowWithoutDate: TvShow = {
      ...mockTvShow,
      first_air_date: '',
    };

    const wrapper = mount(MovieCard, {
      props: { movie: tvShowWithoutDate },
    });

    expect(wrapper.text()).not.toContain('2024-03-20');
  });

  it('correctly identifies and displays different data types', () => {
    const movieWrapper = mount(MovieCard, {
      props: { movie: mockMovie },
    });

    expect(movieWrapper.find('h3').text()).toBe(mockMovie.title);
    expect(movieWrapper.text()).toContain(mockMovie.release_date);

    const tvWrapper = mount(MovieCard, {
      props: { movie: mockTvShow },
    });

    expect(tvWrapper.find('h3').text()).toBe(mockTvShow.name);
    expect(tvWrapper.text()).toContain(mockTvShow.first_air_date);
  });

  it('renders with different rating values correctly', () => {
    const lowRatingMovie: Movie = {
      ...mockMovie,
      vote_average: 3.2,
    };

    const highRatingTv: TvShow = {
      ...mockTvShow,
      vote_average: 10.0,
    };

    const movieWrapper = mount(MovieCard, {
      props: { movie: lowRatingMovie },
    });

    const tvWrapper = mount(MovieCard, {
      props: { movie: highRatingTv },
    });

    expect(movieWrapper.text()).toContain('3.2 rate');
    expect(tvWrapper.text()).toContain('10 rate');
  });
});
