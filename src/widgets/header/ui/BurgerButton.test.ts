import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Loader from './BurgerButton.vue';

describe('BurgerButton', () => {
  it('should be defined', () => {
    const wrapper = mount(Loader);

    expect(wrapper.find('[data-testid="burger-button"]').exists()).toBe(true);
  });
});
