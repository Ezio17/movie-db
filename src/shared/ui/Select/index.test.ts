import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Select from './index.vue';

describe('Select Component', () => {
  const defaultProps = {
    options: [
      { id: 1, name: 'Option 1' },
      { id: 2, name: 'Option 2' },
      { id: 3, name: 'Option 3' },
    ],
    modelValue: '',
    placeholder: 'Select option',
  };

  it('renders correctly with default props', () => {
    const wrapper = mount(Select, { props: defaultProps });

    expect(wrapper.find('select').exists()).toBe(true);
    expect(wrapper.findAll('option')).toHaveLength(4);
  });

  it('displays placeholder when provided', () => {
    const wrapper = mount(Select, { props: defaultProps });
    const placeholder = wrapper.find('option[value=""]');

    expect(placeholder.text()).toBe('Select option');
  });

  it('renders all options correctly', () => {
    const wrapper = mount(Select, { props: defaultProps });
    const options = wrapper.findAll('option:not([value=""])');

    options.forEach((option, index) => {
      expect(option.text()).toBe(`Option ${index + 1}`);
      expect(option.attributes('value')).toBe(String(index + 1));
    });
  });

  it('emits update:modelValue when selection changes', async () => {
    const wrapper = mount(Select, { props: defaultProps });

    await wrapper.find('select').setValue('2');

    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['2']);
  });

  it('shows selected value correctly', () => {
    const wrapper = mount(Select, {
      props: {
        ...defaultProps,
        modelValue: '2',
      },
    });

    expect((wrapper.find('select').element as HTMLSelectElement).value).toBe('2');
  });
});
