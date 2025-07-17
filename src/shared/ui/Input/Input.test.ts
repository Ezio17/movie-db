import { describe, it, expect, beforeEach } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import type { ComponentPublicInstance } from 'vue';
import Input from './Input.vue';

describe('Input.vue', () => {
  let wrapper: VueWrapper<ComponentPublicInstance>;

  beforeEach(() => {
    wrapper = mount(Input, {
      props: {
        modelValue: '',
      },
    });
  });

  it('renders input with default type "text"', () => {
    const input = wrapper.find('input');

    expect(input.attributes('type')).toBe('text');
  });

  it('renders empty input', () => {
    const input = wrapper.find('input');

    expect(input.element.value).toBe('');
  });

  it('emits update:modelValue on user input', async () => {
    const input = wrapper.find('input');

    await input.setValue('Batman');

    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['Batman']);
  });
});
