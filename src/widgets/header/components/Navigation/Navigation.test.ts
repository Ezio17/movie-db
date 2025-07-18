import { mount, VueWrapper } from '@vue/test-utils';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import type { ComponentPublicInstance } from 'vue';
import Navigation from './Navigation.vue';

const mockT = (key: string) => key;

vi.mock('@widgets/header/constants/navigation', () => ({
  default: [
    { name: 'movie', link: '/movie' },
    { name: 'serial', link: '/serial' },
    { name: 'actors', link: '/actors' },
    { name: 'contacts', link: '/contacts' },
  ],
}));

describe('Navigation.vue', () => {
  let wrapper: VueWrapper<ComponentPublicInstance>;

  beforeEach(() => {
    wrapper = mount(Navigation, {
      global: {
        mocks: {
          $t: mockT,
        },
      },
    });
  });

  it('should be defined', () => {
    expect(wrapper.find('[data-testid="navigation"]').exists()).toBe(true);
  });

  it('renders all navigation links', () => {
    const links = wrapper.findAll('a');

    expect(links.length).toBe(4);

    const expectedNames = ['movie', 'serial', 'actors', 'contacts'];

    expectedNames.forEach((name, i) => {
      expect(links[i].text()).toBe(name);
    });
  });

  it('renders correct href attributes', () => {
    const hrefs = wrapper.findAll('a').map((a) => a.attributes('href'));

    expect(hrefs).toEqual(['/movie', '/serial', '/actors', '/contacts']);
  });
});
