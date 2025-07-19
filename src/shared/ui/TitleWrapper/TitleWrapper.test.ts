import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import TitleWrapper from './TitleWrapper.vue';

describe('TitleWrapper', () => {
  it('should be defined', () => {
    const wrapper = mount(TitleWrapper);

    expect(wrapper.find('h2').exists()).toBe(true);
  });
});
