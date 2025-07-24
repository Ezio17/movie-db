import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { createRouter, createWebHistory } from 'vue-router';
import type { Movie } from '@shared/types';
import { mockMovies } from '@shared/constants';
import { generateImgPath } from '@shared/utils';
import MovieCarousel from './index.vue';

vi.mock('@splidejs/vue-splide', () => ({
  Splide: {
    name: 'Splide',
    template: '<div class="splide-mock"><slot /></div>',
    props: ['options'],
  },
  SplideSlide: {
    name: 'SplideSlide',
    template: '<div class="splide-slide-mock"><slot /></div>',
  },
}));

vi.mock('@splidejs/vue-splide/css', () => ({}));

const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: '/', component: { template: '<div>Home</div>' } }],
});

describe('MovieCarousel', () => {
  const createWrapper = (movies: Movie[] = mockMovies) => {
    return mount(MovieCarousel, {
      props: {
        movies,
      },
      global: {
        plugins: [router],
        stubs: {
          NuxtLink: {
            template: '<a href="#"><slot /></a>',
          },
        },
      },
    });
  };

  it('renders carousel when movies are provided', () => {
    const wrapper = createWrapper();

    expect(wrapper.find('.splide-mock').exists()).toBe(true);
    expect(wrapper.findAll('.splide-slide-mock')).toHaveLength(3);
  });

  it('does not render carousel when movies is empty array', () => {
    const wrapper = createWrapper([]);

    expect(wrapper.find('.splide-mock').exists()).toBe(false);
  });

  it('does not render carousel when movies array is empty', () => {
    const wrapper = createWrapper([]);

    expect(wrapper.find('.splide-mock').exists()).toBe(false);
  });

  it('renders movie titles correctly', () => {
    const wrapper = createWrapper();
    const titles = wrapper.findAll('a');

    expect(titles).toHaveLength(3);
    expect(titles[0].text()).toBe('Test Movie 1');
    expect(titles[1].text()).toBe('Test Movie 2');
    expect(titles[2].text()).toBe('Test Movie 3');
  });

  it('renders images with correct attributes', () => {
    const wrapper = createWrapper();
    const images = wrapper.findAll('img');

    expect(images).toHaveLength(3);

    images.forEach((img, index) => {
      const expectedSrc = generateImgPath('original', mockMovies[index].backdrop_path);

      if (index === 0) {
        expect(img.attributes('src')).toBe(expectedSrc);
        expect(img.attributes('data-splide-lazy')).toBeUndefined();
      } else {
        expect(img.attributes('data-splide-lazy')).toBe(expectedSrc);
        expect(img.attributes('src')).toBeUndefined();
      }
    });
  });

  it('filters out movies with null backdrop_path', () => {
    const moviesWithMixedBackdrops: Movie[] = [
      {
        id: 1,
        title: 'Movie With Backdrop',
        original_title: 'Movie With Backdrop',
        original_language: 'en',
        overview: 'Test overview',
        poster_path: '/poster1.jpg',
        backdrop_path: '/backdrop1.jpg',
        genre_ids: [28],
        release_date: '2024-01-01',
        vote_average: 8.0,
        vote_count: 500,
        popularity: 100.0,
        adult: false,
        video: false,
      },
      {
        id: 2,
        title: 'Movie Without Backdrop',
        original_title: 'Movie Without Backdrop',
        original_language: 'en',
        overview: 'Test overview',
        poster_path: '/poster2.jpg',
        backdrop_path: null,
        genre_ids: [35],
        release_date: '2024-02-01',
        vote_average: 7.0,
        vote_count: 300,
        popularity: 80.0,
        adult: false,
        video: false,
      },
      {
        id: 3,
        title: 'Another Movie With Backdrop',
        original_title: 'Another Movie With Backdrop',
        original_language: 'en',
        overview: 'Test overview',
        poster_path: '/poster3.jpg',
        backdrop_path: '/backdrop3.jpg',
        genre_ids: [18],
        release_date: '2024-03-01',
        vote_average: 9.0,
        vote_count: 1000,
        popularity: 150.0,
        adult: false,
        video: false,
      },
    ];

    const wrapper = createWrapper(moviesWithMixedBackdrops);

    expect(wrapper.findAll('.splide-slide-mock')).toHaveLength(2);

    const titles = wrapper.findAll('a');

    expect(titles).toHaveLength(2);
    expect(titles[0].text()).toBe('Movie With Backdrop');
    expect(titles[1].text()).toBe('Another Movie With Backdrop');

    expect(wrapper.text()).not.toContain('Movie Without Backdrop');
  });

  it('handles array with only null backdrop_path movies', () => {
    const moviesWithOnlyNullBackdrops: Movie[] = [
      {
        id: 1,
        title: 'Movie Without Backdrop 1',
        original_title: 'Movie Without Backdrop 1',
        original_language: 'en',
        overview: 'Test overview',
        poster_path: '/poster1.jpg',
        backdrop_path: null,
        genre_ids: [28],
        release_date: '2024-01-01',
        vote_average: 8.0,
        vote_count: 500,
        popularity: 100.0,
        adult: false,
        video: false,
      },
      {
        id: 2,
        title: 'Movie Without Backdrop 2',
        original_title: 'Movie Without Backdrop 2',
        original_language: 'en',
        overview: 'Test overview',
        poster_path: '/poster2.jpg',
        backdrop_path: null,
        genre_ids: [35],
        release_date: '2024-02-01',
        vote_average: 7.0,
        vote_count: 300,
        popularity: 80.0,
        adult: false,
        video: false,
      },
    ];

    const wrapper = createWrapper(moviesWithOnlyNullBackdrops);

    expect(wrapper.find('.splide-mock').exists()).toBe(false);
    expect(wrapper.findAll('.splide-slide-mock')).toHaveLength(0);
  });
});
