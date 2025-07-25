import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import SideMenu from './SideMenu.vue';

describe('SideMenu', () => {
  it('should render when isOpen is true', () => {
    const wrapper = mount(SideMenu, {
      props: { isOpen: true },
    });

    expect(wrapper.find('aside').exists()).toBe(true);
  });

  it('should not render when isOpen is false', () => {
    const wrapper = mount(SideMenu, {
      props: { isOpen: false },
    });

    expect(wrapper.find('aside').exists()).toBe(false);
  });

  it('should emit close event when button clicked', async () => {
    const wrapper = mount(SideMenu, {
      props: { isOpen: true },
    });

    await wrapper.find('button').trigger('click');

    expect(wrapper.emitted('close')).toBeTruthy();
  });

  it('should render slot content', () => {
    const wrapper = mount(SideMenu, {
      props: { isOpen: true },
      slots: {
        default: '<div>Test content</div>',
      },
    });

    expect(wrapper.text()).toContain('Test content');
  });
});
