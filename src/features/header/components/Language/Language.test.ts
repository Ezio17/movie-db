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

mockNuxtImport('useI18n', () => {
  return () => ({
    locale: mockLocale,
    locales: mockLocales,
    setLocale: mockSetLocale,
  });
});

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
    expect(wrapper.find('[data-testid="lang-block"]').exists()).toBe(false);
  });

  it('should toggle dropdown on span click', async () => {
    await wrapper.find('span').trigger('click');

    await nextTick();

    expect(wrapper.find('[data-testid="lang-block"]').exists()).toBe(true);

    await wrapper.find('span').trigger('click');

    await nextTick();

    expect(wrapper.find('[data-testid="lang-block"]').exists()).toBe(false);
  });

  it('should render all available locales in dropdown', async () => {
    await wrapper.find('span').trigger('click');

    await nextTick();

    const langBlock = wrapper.find('[data-testid="lang-block"]');

    expect(langBlock.exists()).toBe(true);

    const listItems = wrapper.findAll('li');

    expect(listItems.length).toBe(mockLocales.value.length);
    expect(listItems.map((li) => li.text())).toEqual(mockLocales.value.map((l) => l.name));
  });

  it('should change locale when language is clicked', async () => {
    await wrapper.find('span').trigger('click');

    await nextTick();

    const langBlock = wrapper.find('[data-testid="lang-block"]');

    expect(langBlock.exists()).toBe(true);

    const listItems = wrapper.findAll('li');

    expect(listItems.length).toBeGreaterThan(1);

    await listItems[1].trigger('click');

    await nextTick();

    expect(mockSetLocale).toHaveBeenCalledWith('en');
    expect(wrapper.find('[data-testid="lang-block"]').exists()).toBe(false);
  });

  it('should close dropdown after language change', async () => {
    await wrapper.find('span').trigger('click');

    await nextTick();

    expect(wrapper.find('[data-testid="lang-block"]').exists()).toBe(true);

    const listItems = wrapper.findAll('li');

    expect(listItems.length).toBeGreaterThan(1);

    await listItems[1].trigger('click');

    await nextTick();

    expect(wrapper.find('[data-testid="lang-block"]').exists()).toBe(false);
  });

  it('should handle setLocale errors gracefully', async () => {
    mockSetLocale.mockRejectedValueOnce(new Error('Locale change failed'));

    await wrapper.find('span').trigger('click');

    await nextTick();

    const listItems = wrapper.findAll('li');

    expect(listItems.length).toBeGreaterThan(1);

    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    await listItems[1].trigger('click');

    await nextTick();

    expect(mockSetLocale).toHaveBeenCalledWith('en');
    expect(consoleErrorSpy).toHaveBeenCalledWith('Failed to change language:', expect.any(Error));
    expect(wrapper.find('[data-testid="lang-block"]').exists()).toBe(false);

    consoleErrorSpy.mockRestore();
  });

  it('should prevent event propagation on span click', async () => {
    const stopPropagationSpy = vi.fn();

    await wrapper.find('span').trigger('click', { stopPropagation: stopPropagationSpy });

    await nextTick();

    expect(stopPropagationSpy).toHaveBeenCalled();
    expect(wrapper.find('[data-testid="lang-block"]').exists()).toBe(true);
  });
});
