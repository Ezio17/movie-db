import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import MenuOverlay from './MenuOverlay.vue';

describe('MenuOverlay', () => {
  it('should be defined', () => {
    const wrapper = mount(MenuOverlay, {
      props: {
        isOpen: true,
      },
    });

    expect(wrapper.find('div').exists()).toBe(true);
  });
});
