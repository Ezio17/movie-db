import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import type { AdaptedRecommendation } from '@shared/types';
import MediaCard from './MediaCard.vue';

vi.mock('@/assets/img/not-found.webp', () => ({
  default: '/mock-not-found.webp',
}));

describe('MediaCard', () => {
  const mockAdaptedMovie: AdaptedRecommendation = {
    id: 1,
    type: 'movie',
    name: 'Test Movie',
    poster_path: '/test-poster.jpg',
    release_date: '2024-01-15',
    vote_average: 8.5,
  };

  const mockAdaptedTv: AdaptedRecommendation = {
    id: 2,
    type: 'tv',
    name: 'Test TV Show',
    poster_path: '/test-tv-poster.jpg',
    release_date: '2024-03-20',
    vote_average: 9.2,
  };

  const mockAdaptedPerson: AdaptedRecommendation = {
    id: 3,
    type: 'person',
    name: 'Test Actor',
    poster_path: '/test-person.jpg',
    release_date: null,
    vote_average: null,
  };

  it('renders movie name and data correctly', () => {
    const wrapper = mount(MediaCard, {
      props: { mediaData: mockAdaptedMovie },
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
    const wrapper = mount(MediaCard, {
      props: { mediaData: mockAdaptedTv },
    });

    expect(wrapper.find('h3').text()).toBe('Test TV Show');

    expect(wrapper.find('img').attributes('src')).toBe(
      'https://image.tmdb.org/t/p/w185/test-tv-poster.jpg'
    );
    expect(wrapper.find('img').attributes('alt')).toBe('poster');
    expect(wrapper.text()).toContain('9.2 rate');
    expect(wrapper.text()).toContain('2024-03-20');
  });

  it('hides vote average when it is null for person', () => {
    const wrapper = mount(MediaCard, {
      props: { mediaData: mockAdaptedPerson },
    });

    expect(wrapper.text()).not.toContain('rate');
  });

  it('hides release date when it is null for person', () => {
    const wrapper = mount(MediaCard, {
      props: { mediaData: mockAdaptedPerson },
    });

    expect(wrapper.text()).not.toContain('2024');
  });

  it('displays fallback image when poster_path is null', () => {
    const movieWithNullPoster: AdaptedRecommendation = {
      ...mockAdaptedMovie,
      poster_path: null,
    };

    const wrapper = mount(MediaCard, {
      props: { mediaData: movieWithNullPoster },
    });

    const img = wrapper.find('img');

    expect(img.attributes('src')).toBe('/mock-not-found.webp');
    expect(img.attributes('alt')).toBe('No image');
  });

  it('handles different content types correctly', () => {
    const movieWrapper = mount(MediaCard, {
      props: { mediaData: mockAdaptedMovie },
    });

    const tvWrapper = mount(MediaCard, {
      props: { mediaData: mockAdaptedTv },
    });

    const personWrapper = mount(MediaCard, {
      props: { mediaData: mockAdaptedPerson },
    });

    // Movie
    expect(movieWrapper.find('h3').text()).toBe('Test Movie');
    expect(movieWrapper.text()).toContain('8.5 rate');
    expect(movieWrapper.text()).toContain('2024-01-15');

    // TV Show
    expect(tvWrapper.find('h3').text()).toBe('Test TV Show');
    expect(tvWrapper.text()).toContain('9.2 rate');
    expect(tvWrapper.text()).toContain('2024-03-20');

    // Person
    expect(personWrapper.find('h3').text()).toBe('Test Actor');
    expect(personWrapper.text()).not.toContain('rate');
    expect(personWrapper.text()).not.toContain('2024');
  });

  it('displays fallback image when poster_path is undefined', () => {
    const movieWithUndefinedPoster = {
      ...mockAdaptedMovie,
      poster_path: undefined,
    } as unknown as AdaptedRecommendation;

    const wrapper = mount(MediaCard, {
      props: { mediaData: movieWithUndefinedPoster },
    });

    const img = wrapper.find('img');

    expect(img.attributes('src')).toBe('/mock-not-found.webp');
    expect(img.attributes('alt')).toBe('No image');
  });

  it('hides vote average when it is 0', () => {
    const movieWithZeroRating: AdaptedRecommendation = {
      ...mockAdaptedMovie,
      vote_average: 0,
    };

    const wrapper = mount(MediaCard, {
      props: { mediaData: movieWithZeroRating },
    });

    expect(wrapper.text()).not.toContain('rate');
  });

  it('hides release date when it is empty', () => {
    const movieWithoutDate: AdaptedRecommendation = {
      ...mockAdaptedMovie,
      release_date: '',
    };

    const wrapper = mount(MediaCard, {
      props: { mediaData: movieWithoutDate },
    });

    expect(wrapper.text()).not.toContain('2024-01-15');
  });

  it('renders with different rating values correctly', () => {
    const lowRatingMovie: AdaptedRecommendation = {
      ...mockAdaptedMovie,
      vote_average: 3.2,
    };

    const highRatingMovie: AdaptedRecommendation = {
      ...mockAdaptedTv,
      vote_average: 10.0,
    };

    const movieWrapper = mount(MediaCard, {
      props: { mediaData: lowRatingMovie },
    });

    const tvWrapper = mount(MediaCard, {
      props: { mediaData: highRatingMovie },
    });

    expect(movieWrapper.text()).toContain('3.2 rate');
    expect(tvWrapper.text()).toContain('10 rate');
  });

  it('emits click event when card is clicked', () => {
    const wrapper = mount(MediaCard, {
      props: { mediaData: mockAdaptedMovie },
    });

    const card = wrapper.find('.cursor-pointer');

    card.trigger('click');

    expect(wrapper.emitted('click')).toBeTruthy();
    expect(wrapper.emitted('click')).toHaveLength(1);
  });

  it('displays both rating and date when available', () => {
    const wrapper = mount(MediaCard, {
      props: { mediaData: mockAdaptedMovie },
    });

    const infoDiv = wrapper.find('.flex.justify-between');

    expect(infoDiv.exists()).toBe(true);
    expect(wrapper.text()).toContain('8.5 rate');
    expect(wrapper.text()).toContain('2024-01-15');
  });

  it('displays only rating when date is empty', () => {
    const movieWithoutDate: AdaptedRecommendation = {
      ...mockAdaptedMovie,
      release_date: '',
    };

    const wrapper = mount(MediaCard, {
      props: { mediaData: movieWithoutDate },
    });

    expect(wrapper.text()).toContain('8.5 rate');
    expect(wrapper.text()).not.toContain('2024-01-15');
  });

  it('displays only date when rating is 0', () => {
    const movieWithoutRating: AdaptedRecommendation = {
      ...mockAdaptedMovie,
      vote_average: 0,
    };

    const wrapper = mount(MediaCard, {
      props: { mediaData: movieWithoutRating },
    });

    expect(wrapper.text()).not.toContain('rate');
    expect(wrapper.text()).toContain('2024-01-15');
  });

  it('handles missing poster_path gracefully', () => {
    const movieWithoutPoster = {
      id: 1,
      name: 'Test Movie',
      release_date: '2024-01-15',
      vote_average: 8.5,
    } as AdaptedRecommendation;

    const wrapper = mount(MediaCard, {
      props: { mediaData: movieWithoutPoster },
    });

    const img = wrapper.find('img');

    expect(img.attributes('src')).toBe('/mock-not-found.webp');
    expect(img.attributes('alt')).toBe('No image');
  });
});
