import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import MobileNavigation from './MobileNavigation.vue';

vi.mock('@shared/constants', () => ({
  navigation: [
    { link: '/movie', name: 'movie' },
    { link: '/serial', name: 'serial' },
    { link: '/cartoon', name: 'cartoon' },
    { link: '/anime', name: 'anime' },
  ],
}));

const mockNuxtLink = {
  template: '<a :to="to"><slot /></a>',
  props: ['to'],
};

describe('MobileNavigation', () => {
  it('should render navigation links', () => {
    const wrapper = mount(MobileNavigation, {
      global: {
        components: { NuxtLink: mockNuxtLink },
        mocks: { $t: (key: string) => key },
      },
    });

    const links = wrapper.findAll('a');

    expect(links).toHaveLength(4);
  });

  it('should have correct link paths', () => {
    const wrapper = mount(MobileNavigation, {
      global: {
        components: { NuxtLink: mockNuxtLink },
        mocks: { $t: (key: string) => key },
      },
    });

    const hrefs = wrapper.findAll('a').map((a) => a.attributes('href'));

    expect(hrefs).toEqual(['/movie', '/serial', '/cartoon', '/anime']);
  });

  it('should translate link names', () => {
    const wrapper = mount(MobileNavigation, {
      global: {
        components: { NuxtLink: mockNuxtLink },
        mocks: { $t: (key: string) => `translated_${key}` },
      },
    });

    expect(wrapper.text()).toContain('translated_movie');
    expect(wrapper.text()).toContain('translated_serial');
    expect(wrapper.text()).toContain('translated_cartoon');
    expect(wrapper.text()).toContain('translated_anime');
  });
});
