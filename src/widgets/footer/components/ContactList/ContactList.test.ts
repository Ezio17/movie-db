import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import ContactList from './ContactList.vue';

vi.mock('@widgets/footer/constants/contacts', () => ({
  default: [
    {
      title: 'Email',
      text: 'test@example.com',
      href: 'mailto:test@example.com',
    },
    {
      title: 'Github',
      text: 'github.com/test',
      href: 'https://github.com/test',
    },
  ] as const,
}));

describe('ContactList', () => {
  it('should be defined', () => {
    expect(ContactList).toBeDefined();
  });

  it('renders mocked contact items', () => {
    const wrapper = mount(ContactList, {
      global: {
        mocks: {
          $t: (msg: string) => msg,
        },
      },
    });

    const listItems = wrapper.findAll('li');

    expect(listItems.length).toBe(2);

    const links = wrapper.findAll('a');

    expect(links[0].text()).toBe('test@example.com');
    expect(links[0].attributes('href')).toBe('mailto:test@example.com');

    expect(links[1].text()).toBe('github.com/test');
    expect(links[1].attributes('href')).toBe('https://github.com/test');
  });
});
