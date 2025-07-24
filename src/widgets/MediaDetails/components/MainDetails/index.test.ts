import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { createI18n } from 'vue-i18n';
import type { AdaptedDetails } from '@shared/types';

import MainDetails from './index.vue';

vi.mock('@widgets/MediaDetails/ui/index', () => ({
  List: {
    name: 'List',
    props: ['title', 'description'],
    template: '<div data-testid="list-item">{{ title }}: {{ description }}</div>',
  },
}));

const createWrapper = (details: Partial<AdaptedDetails> = {}) => {
  const i18n = createI18n({
    locale: 'en',
    messages: {
      en: {},
    },
  });

  const defaultDetails: AdaptedDetails = {
    id: 1,
    type: 'movie',
    title: 'Test Movie',
    overview: 'Test overview',
    poster_path: '/test-poster.jpg',
    backdrop_path: '/test-backdrop.jpg',
    release_date: '',
    tagline: '',
    genres: '',
    runtime: null,
    production_countries: '',
    production_companies: '',
    vote_average: 0,
    vote_count: 0,
    status: 'Released',
    ...details,
  };

  return mount(MainDetails, {
    props: {
      details: defaultDetails,
    },
    global: {
      plugins: [i18n],
    },
  });
};

describe('MainDetails', () => {
  it('should render without crashing', () => {
    const wrapper = createWrapper();

    expect(wrapper.exists()).toBe(true);
  });

  it('should handle null runtime', () => {
    const wrapper = createWrapper({
      runtime: null,
    });

    const listItems = wrapper.findAll('[data-testid="list-item"]');
    const runtimeItem = listItems.find((item) => item.text().includes('runtime'));

    expect(runtimeItem).toBeUndefined();
  });

  it('should not render List components for items without descriptions', () => {
    const wrapper = createWrapper({
      release_date: '',
      tagline: '',
      genres: '',
      runtime: null,
      production_countries: '',
      production_companies: '',
      vote_average: 0,
      vote_count: 0,
    });

    const listItems = wrapper.findAll('[data-testid="list-item"]');

    expect(listItems).toHaveLength(0);
  });

  it('should handle all detail properties', () => {
    const testDetails: AdaptedDetails = {
      id: 1,
      type: 'movie',
      title: 'Test Movie',
      overview: 'Epic adventure story',
      poster_path: '/poster.jpg',
      backdrop_path: '/backdrop.jpg',
      release_date: '2023-12-01',
      tagline: 'Epic adventure',
      genres: 'Sci-Fi, Action',
      runtime: 150,
      production_countries: 'USA, UK',
      production_companies: 'Studio A, Studio B',
      vote_average: 8.5,
      vote_count: 1000,
      status: 'Released',
    };

    const wrapper = createWrapper(testDetails);
    const listItems = wrapper.findAll('[data-testid="list-item"]');

    expect(listItems).toHaveLength(8);
  });

  it('should compute lists correctly with mixed data', () => {
    const wrapper = createWrapper({
      release_date: '2023-01-01',
      tagline: '',
      genres: 'Comedy',
      runtime: 90,
      production_countries: '',
      production_companies: 'Warner Bros',
      vote_average: 7.2,
      vote_count: 0,
    });

    const listItems = wrapper.findAll('[data-testid="list-item"]');

    expect(listItems.length).toBe(5);
  });

  it('should have correct computed property structure', () => {
    const wrapper = createWrapper({
      release_date: '2023-01-01',
      tagline: 'Test tagline',
      genres: 'Action',
      runtime: 120,
    });

    const listItems = wrapper.findAll('[data-testid="list-item"]');

    expect(listItems.length).toBeGreaterThan(0);

    listItems.forEach((item) => {
      const text = item.text();

      expect(text).toContain(':');
      expect(text.length).toBeGreaterThan(0);
    });
  });

  it('should update when props change', async () => {
    const wrapper = createWrapper({
      tagline: 'Original tagline',
    });

    await wrapper.setProps({
      details: {
        ...wrapper.props().details,
        tagline: 'Updated tagline',
      },
    });

    const listItems = wrapper.findAll('[data-testid="list-item"]');
    const taglineItem = listItems.find((item) => item.text().includes('Updated tagline'));

    expect(taglineItem).toBeDefined();
  });

  it('should handle vote_average and vote_count as numbers', () => {
    const wrapper = createWrapper({
      vote_average: 8.7,
      vote_count: 2500,
    });

    const listItems = wrapper.findAll('[data-testid="list-item"]');
    const voteAverageItem = listItems.find((item) => item.text().includes('8.7'));
    const voteCountItem = listItems.find((item) => item.text().includes('2500'));

    expect(voteAverageItem).toBeDefined();
    expect(voteCountItem).toBeDefined();
  });

  it('should not render items with zero vote values', () => {
    const wrapper = createWrapper({
      vote_average: 0,
      vote_count: 0,
    });

    const listItems = wrapper.findAll('[data-testid="list-item"]');
    const voteItems = listItems.filter((item) => {
      const text = item.text();

      return text.includes('vote_average') || text.includes('vote_count');
    });

    expect(voteItems).toHaveLength(0);
  });

  it('should format runtime using i18n', () => {
    const wrapper = createWrapper({ runtime: 150 });
    const listItems = wrapper.findAll('[data-testid="list-item"]');
    const runtimeItem = listItems.find((item) => item.text().includes('runtime'));

    expect(runtimeItem).toBeDefined();
    expect(runtimeItem?.text()).toContain('2 h 30 min');
  });
});
