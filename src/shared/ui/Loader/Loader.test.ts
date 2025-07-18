import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Loader from './Loader.vue';

describe('Loader', () => {
  it('should be defined', () => {
    const wrapper = mount(Loader);

    expect(wrapper.find('[data-testid="loader"]').exists()).toBe(true);
  });
});
