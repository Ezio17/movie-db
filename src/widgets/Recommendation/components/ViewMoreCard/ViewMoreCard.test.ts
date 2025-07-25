import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import ViewMoreCard from './ViewMoreCard.vue';

const mockT = (key: string) => key;

describe('ViewMoreCard', () => {
  it('should be defined', () => {
    const wrapper = mount(ViewMoreCard, {
      global: {
        mocks: {
          $t: mockT,
        },
      },
    });

    expect(wrapper.find('[data-testid="view-more-card"]').exists()).toBe(true);
  });
});
