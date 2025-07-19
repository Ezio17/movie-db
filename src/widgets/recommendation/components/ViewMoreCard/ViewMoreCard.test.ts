import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import ViewMoreCard from './ViewMoreCard.vue';

describe('ViewMoreCard', () => {
  it('should be defined', () => {
    const wrapper = mount(ViewMoreCard);

    expect(wrapper.find('[data-testid="view-more-card"]').exists()).toBe(true);
  });
});
