import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import List from './index.vue';

const mockT = vi.fn((key: string) => {
  const translations: Record<string, string> = {
    release_date: 'Дата релізу',
    tagline: 'Слоган',
    genres: 'Жанри',
    runtime: 'Тривалість',
    production_countries: 'Країни',
    production_companies: 'Компанії',
    vote_average: 'Середня оцінка',
    vote_count: 'Кількість голосів',
  };

  return translations[key] || key;
});

describe('List', () => {
  it('renders title and description correctly', () => {
    const wrapper = mount(List, {
      props: {
        title: 'release_date',
        description: '2023-07-21',
      },
      global: {
        mocks: {
          $t: mockT,
        },
      },
    });

    expect(wrapper.find('.text-primary').text()).toBe('Дата релізу:');
    expect(wrapper.find('.text-white').text()).toBe('2023-07-21');
  });

  it('renders with number description', () => {
    const wrapper = mount(List, {
      props: {
        title: 'vote_average',
        description: 8.5,
      },
      global: {
        mocks: {
          $t: mockT,
        },
      },
    });

    expect(wrapper.find('.text-primary').text()).toBe('Середня оцінка:');
    expect(wrapper.find('.text-white').text()).toBe('8.5');
  });

  it('calls $t with correct title key', () => {
    mount(List, {
      props: {
        title: 'genres',
        description: 'Action, Drama',
      },
      global: {
        mocks: {
          $t: mockT,
        },
      },
    });

    expect(mockT).toHaveBeenCalledWith('genres');
  });

  it('renders all movie info keys correctly', () => {
    const testCases = [
      { title: 'release_date', description: '2023-07-21', expected: 'Дата релізу:' },
      { title: 'tagline', description: 'An epic adventure', expected: 'Слоган:' },
      { title: 'genres', description: 'Action, Drama', expected: 'Жанри:' },
      { title: 'runtime', description: '148 min', expected: 'Тривалість:' },
      { title: 'production_countries', description: 'USA, UK', expected: 'Країни:' },
      { title: 'production_companies', description: 'Warner Bros', expected: 'Компанії:' },
      { title: 'vote_average', description: 8.5, expected: 'Середня оцінка:' },
      { title: 'vote_count', description: 1500, expected: 'Кількість голосів:' },
    ];

    testCases.forEach(({ title, description, expected }) => {
      const wrapper = mount(List, {
        props: { title, description },
        global: {
          mocks: {
            $t: mockT,
          },
        },
      });

      expect(wrapper.find('.text-primary').text()).toBe(expected);
      expect(wrapper.find('.text-white').text()).toBe(String(description));
    });
  });

  it('handles empty string description', () => {
    const wrapper = mount(List, {
      props: {
        title: 'tagline',
        description: '',
      },
      global: {
        mocks: {
          $t: mockT,
        },
      },
    });

    expect(wrapper.find('.text-white').text()).toBe('');
  });

  it('handles zero as description', () => {
    const wrapper = mount(List, {
      props: {
        title: 'vote_count',
        description: 0,
      },
      global: {
        mocks: {
          $t: mockT,
        },
      },
    });

    expect(wrapper.find('.text-white').text()).toBe('0');
  });
});
