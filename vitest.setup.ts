// vitest.setup.ts
import { beforeAll, afterEach, afterAll, vi } from 'vitest';
import { config } from '@vue/test-utils';

beforeAll(() => {
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
