<template>
  <div class="relative text-black">
    <span
      class="cursor-pointer capitalize text-white text-xl font-bold"
      @click.stop="toggleBlock"
      >{{ locale }}</span
    >

    <div
      v-if="isOpen"
      ref="langBlock"
      data-testid="langBlock"
      class="absolute z-10 left-[-170%] top-[-25%] p-3 bg-gray-200 rounded-md shadow-2xl"
    >
      <ul>
        <li
          v-for="{ code, name } of locales"
          :key="code"
          class="mb-1 last:mb-0 cursor-pointer text-base font-bold hover:underline inline-block"
          @click="changeLanguage(code)"
        >
          {{ name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import useClickOutside from '@shared/composable/useClickOutside';
import { ref } from 'vue';
import type { Locales } from '@shared/types';
import { useNuxtApp, reloadNuxtApp } from '#app';

// Робота з відкриванням
const isOpen = ref(false);
const langBlock = ref(null);

function toggleBlock() {
  isOpen.value = !isOpen.value;
}

useClickOutside(langBlock, isOpen, toggleBlock);

// Робота зі зміною мови
const {
  $i18n: { locale, locales, setLocale },
} = useNuxtApp();

async function changeLanguage(lang: Locales) {
  try {
    await setLocale(lang);

    reloadNuxtApp({ ttl: 0 });
  } catch (error) {
    console.error('Failed to change language:', error);
  } finally {
    toggleBlock();
  }
}
</script>
