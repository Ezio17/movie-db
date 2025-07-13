// vitest.setup.ts
import { beforeAll, afterEach, afterAll, vi } from 'vitest';
import { createI18n } from 'vue-i18n';
import { config } from '@vue/test-utils';
import uk from './i18n/locales/uk.json';
import en from './i18n/locales/en.json';
import es from './i18n/locales/es.json';

type MessageUk = typeof uk;
type MessageEn = typeof en;
type MessageEs = typeof en;

type MessageSchema = MessageEn & MessageUk & MessageEs;

type Locales = 'uk' | 'en' | 'es';

export const i18n = createI18n<[MessageSchema], Locales>({
  legacy: false,
  globalInjection: true,
  locale: 'uk',
  fallbackLocale: 'uk',
  messages: {
    uk,
    en,
    es,
  },
});

beforeAll(() => {
  config.global.plugins = [i18n];

  config.global.stubs = {
    NuxtLink: {
      template: '<a :href="to"><slot /></a>',
      props: ['to'],
    },
    NuxtImg: {
      template: '<img :src="src" :alt="alt" />',
      props: ['src', 'alt'],
    },
    NuxtPage: {
      template: '<div><slot /></div>',
    },
    NuxtLayout: {
      template: '<div><slot /></div>',
    },
    ClientOnly: {
      template: '<slot />',
    },
  };
});

afterEach(() => {
  vi.clearAllMocks();
});

afterAll(() => {
  config.global.plugins = [];
  config.global.stubs = {};
});
