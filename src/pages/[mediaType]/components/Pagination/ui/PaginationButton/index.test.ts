import { beforeEach, describe, expect, it } from 'vitest';
import { DOMWrapper, mount, VueWrapper } from '@vue/test-utils';
import type { ComponentPublicInstance } from 'vue';
import PaginationButton from './index.vue';

describe('PaginationButton', () => {
  let wrapper: VueWrapper<ComponentPublicInstance>;
  let btn: DOMWrapper<Element>;
  const slotText = 'Test';

  beforeEach(() => {
    wrapper = mount(PaginationButton, {
      slots: {
        default: slotText,
      },
    });

    btn = wrapper.find('[data-testid="pagination-button"]');
  });

  it('should render correctly with slot', () => {
    expect(btn.text()).toBe(slotText);
  });

  it('should emit click event when clicked', async () => {
    await btn.trigger('click');

    expect(wrapper.emitted('click')).toHaveLength(1);
  });

  it('should apply correct disabled styles when in disabled mode', () => {
    const wrapperLocal = mount(PaginationButton, {
      props: {
        disabled: true,
      },
      slots: {
        default: slotText,
      },
    });

    const btnLocal = wrapperLocal.find('[data-testid="pagination-button"]');

    expect(btnLocal.classes()).toContain('opacity-50');
    expect(btnLocal.classes()).toContain('pointer-events-none');
  });
});
