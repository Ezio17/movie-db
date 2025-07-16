import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import { ref, nextTick } from 'vue';
import { mockNuxtImport } from '@nuxt/test-utils/runtime';
import Language from './Language.vue';

const mockLocale = ref('uk');
const mockLocales = ref([
  { code: 'uk', name: 'Україна' },
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
]);
const mockSetLocale = vi.fn();

mockNuxtImport('useNuxtApp', () => {
  return () => ({
    $i18n: {
      locale: mockLocale,
      locales: mockLocales,
      setLocale: mockSetLocale,
    },
  });
});

vi.mock('@shared/composable/useClickOutside', () => ({
  default: vi.fn(),
}));

describe('Language Component', () => {
  let wrapper: VueWrapper<InstanceType<typeof Language>>;

  beforeEach(() => {
    vi.clearAllMocks();
    mockSetLocale.mockResolvedValue(undefined);
    wrapper = mount(Language);
  });

  it('should render current locale', () => {
    const span = wrapper.find('span');

    expect(span.exists()).toBe(true);
    expect(span.text()).toBe(mockLocale.value);
  });

  it('should not show dropdown initially', () => {
    const dropdown = wrapper.find('[data-testid="langBlock"]');

    expect(dropdown.exists()).toBe(false);
  });

  it('should toggle dropdown on span click', async () => {
    const span = wrapper.find('span');

    await span.trigger('click');
    await nextTick();

    let dropdown = wrapper.find('[data-testid="langBlock"]');

    expect(dropdown.exists()).toBe(true);

    await span.trigger('click');
    await nextTick();

    dropdown = wrapper.find('[data-testid="langBlock"]');
    expect(dropdown.exists()).toBe(false);
  });

  it('should render all available locales in dropdown', async () => {
    const span = wrapper.find('span');

    await span.trigger('click');
    await nextTick();

    const dropdown = wrapper.find('[data-testid="langBlock"]');

    expect(dropdown.exists()).toBe(true);

    const listItems = wrapper.findAll('li');

    expect(listItems.length).toBe(mockLocales.value.length);

    const renderedNames = listItems.map((li) => li.text());
    const expectedNames = mockLocales.value.map((locale) => locale.name);

    expect(renderedNames).toEqual(expectedNames);
  });

  it('should change locale when language is clicked', async () => {
    const span = wrapper.find('span');

    await span.trigger('click');
    await nextTick();

    const listItems = wrapper.findAll('li');

    expect(listItems.length).toBeGreaterThan(1);

    await listItems[1].trigger('click');
    await nextTick();

    expect(mockSetLocale).toHaveBeenCalledWith('en');
  });

  it('should close dropdown after language change', async () => {
    const span = wrapper.find('span');

    await span.trigger('click');
    await nextTick();

    let dropdown = wrapper.find('[data-testid="langBlock"]');

    expect(dropdown.exists()).toBe(true);

    const listItems = wrapper.findAll('li');

    await listItems[1].trigger('click');
    await nextTick();

    dropdown = wrapper.find('[data-testid="langBlock"]');
    expect(dropdown.exists()).toBe(false);
  });

  it('should handle setLocale errors', async () => {
    mockSetLocale.mockRejectedValueOnce(new Error('Locale change failed'));

    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const span = wrapper.find('span');

    await span.trigger('click');
    await nextTick();

    const listItems = wrapper.findAll('li');

    await listItems[1].trigger('click');
    await nextTick();

    expect(mockSetLocale).toHaveBeenCalledWith('en');
    expect(consoleErrorSpy).toHaveBeenCalledWith('Failed to change language:', expect.any(Error));

    const dropdown = wrapper.find('[data-testid="langBlock"]');

    expect(dropdown.exists()).toBe(false);

    consoleErrorSpy.mockRestore();
  });

  it('should render correct locale codes and names', async () => {
    const span = wrapper.find('span');

    await span.trigger('click');
    await nextTick();

    const listItems = wrapper.findAll('li');

    listItems.forEach((li, index) => {
      const expectedName = mockLocales.value[index].name;

      expect(li.text()).toBe(expectedName);
    });
  });
});
