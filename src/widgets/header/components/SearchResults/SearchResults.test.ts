import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { mockMovies } from '@shared/constants';
import MovieSearchResults from './SearchResults.vue';
import type { MovieResponse } from '@/shared/types';

const mockTranslate = vi.fn((key: string) => {
  const translations: Record<string, string> = {
    'no results found': 'Результати не знайдено',
    release: 'Реліз',
    rate: 'Рейтинг',
    'show more': 'Показати більше',
  };

  return translations[key] || key;
});

const mockMovieResponse: MovieResponse = {
  page: 1,
  results: mockMovies,
  total_pages: 1,
  total_results: 3,
};

const createWrapper = (props = {}) => {
  return mount(MovieSearchResults, {
    props: {
      movies: null,
      pending: false,
      errorMessage: '',
      ...props,
    },
    global: {
      mocks: {
        $t: mockTranslate,
      },
    },
  });
};

describe('MovieSearchResults', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should show loader when pending is true', () => {
    const wrapper = createWrapper({ pending: true });

    expect(wrapper.find('[data-testid="loader"]').exists()).toBe(true);
    expect(wrapper.find('[data-testid="search-message"]').exists()).toBe(false);
  });

  it('should not show loader when pending is false', () => {
    const wrapper = createWrapper({ pending: false });

    expect(wrapper.find('[data-testid="loader"]').exists()).toBe(false);
  });

  it('should display error message when provided', () => {
    const errorMessage = 'Помилка завантаження фільмів';
    const wrapper = createWrapper({ errorMessage });

    expect(wrapper.text()).toContain(errorMessage);
    expect(wrapper.find('[data-testid="search-message"]').exists()).toBe(true);
  });

  it('should show "no results found" when no movies are available', () => {
    const wrapper = createWrapper({
      movies: {
        page: 1,
        results: [],
        total_pages: 0,
        total_results: 0,
      },
    });

    expect(wrapper.text()).toContain('Результати не знайдено');
    expect(mockTranslate).toHaveBeenCalledWith('no results found');
  });

  it('should render list of movies', () => {
    const wrapper = createWrapper({ movies: mockMovieResponse });

    const movieItems = wrapper.findAll('[data-testid="search-main"]');

    expect(movieItems).toHaveLength(3);

    expect(wrapper.text()).toContain('Test Movie 1');
    expect(wrapper.text()).toContain('Test Movie 2');
    expect(wrapper.text()).toContain('Test Movie 3');
  });

  it('should display movie release date', () => {
    const wrapper = createWrapper({ movies: mockMovieResponse });

    expect(wrapper.text()).toContain('Реліз: 2024-01-01');
    expect(wrapper.text()).toContain('Реліз: 2024-02-01');
    expect(mockTranslate).toHaveBeenCalledWith('release');
  });

  it('should display movie rating', () => {
    const wrapper = createWrapper({ movies: mockMovieResponse });

    expect(wrapper.text()).toContain('Рейтинг: 8.5');
    expect(wrapper.text()).toContain('Рейтинг: 7.2');
    expect(mockTranslate).toHaveBeenCalledWith('rate');
  });

  it('should display movie poster when available', () => {
    const wrapper = createWrapper({ movies: mockMovieResponse });

    const images = wrapper.findAll('img');

    expect(images).toHaveLength(2);

    expect(images[0].attributes('src')).toBe('https://image.tmdb.org/t/p/w92/poster1.jpg');
    expect(images[1].attributes('src')).toBe('https://image.tmdb.org/t/p/w92/poster2.jpg');
  });

  it('should not display poster when not available', () => {
    const movieWithoutPoster: MovieResponse = {
      page: 1,
      results: [
        {
          ...mockMovies[0],
          poster_path: null,
        },
      ],
      total_pages: 1,
      total_results: 1,
    };

    const wrapper = createWrapper({ movies: movieWithoutPoster });

    expect(wrapper.findAll('img')).toHaveLength(0);
  });

  it('should display maximum 9 movies', () => {
    const manyMovies: MovieResponse = {
      page: 1,
      results: Array.from({ length: 15 }, (_, i) => ({
        ...mockMovies[0],
        id: i + 1,
        title: `Test Movie ${i + 1}`,
      })),
      total_pages: 2,
      total_results: 15,
    };

    const wrapper = createWrapper({ movies: manyMovies });

    const movieItems = wrapper.findAll('[data-testid="search-main"]');

    expect(movieItems).toHaveLength(9);
  });

  it('should not show release date when empty', () => {
    const movieWithoutDate: MovieResponse = {
      page: 1,
      results: [
        {
          ...mockMovies[0],
          release_date: '',
        },
      ],
      total_pages: 1,
      total_results: 1,
    };

    const wrapper = createWrapper({ movies: movieWithoutDate });

    expect(wrapper.text()).not.toContain('Реліз:');
  });

  it('should not show rating when zero', () => {
    const movieWithoutRating: MovieResponse = {
      page: 1,
      results: [
        {
          ...mockMovies[0],
          vote_average: 0,
        },
      ],
      total_pages: 1,
      total_results: 1,
    };

    const wrapper = createWrapper({ movies: movieWithoutRating });

    expect(wrapper.text()).not.toContain('Рейтинг:');
  });

  it('should expose innerEl ref', () => {
    const wrapper = createWrapper({ movies: mockMovieResponse });

    expect(wrapper.vm.innerEl).toBeDefined();
    expect(wrapper.vm.innerEl).not.toBeNull();
    expect(wrapper.vm.innerEl).toBeInstanceOf(HTMLElement);
  });

  it('should correctly display sliced movies when movies are provided', () => {
    const wrapper = createWrapper({ movies: mockMovieResponse });

    const movieItems = wrapper.findAll('[data-testid="search-main"]');

    expect(movieItems).toHaveLength(3);

    expect(wrapper.text()).toContain('Test Movie 1');
    expect(wrapper.text()).toContain('Test Movie 2');
    expect(wrapper.text()).toContain('Test Movie 3');
  });

  it('should show no results when no movies are provided', () => {
    const wrapper = createWrapper({ movies: null });

    const movieItems = wrapper.findAll('[data-testid="search-main"]');

    expect(movieItems).toHaveLength(0);
    expect(wrapper.text()).toContain('Результати не знайдено');
  });
});

describe('Reactivity', () => {
  it('should update when props change', async () => {
    const wrapper = createWrapper({ pending: true });

    expect(wrapper.find('[data-testid="loader"]').exists()).toBe(true);

    await wrapper.setProps({ pending: false, movies: mockMovieResponse });

    expect(wrapper.find('[data-testid="loader"]').exists()).toBe(false);
    expect(wrapper.text()).toContain('Test Movie 1');
  });
});
