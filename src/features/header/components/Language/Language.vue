<template>
  <div class="relative text-black">
    <span class="cursor-pointer capitalize text-white font-bold" @click.stop="toggleBlock">{{
      locale
    }}</span>

    <div
      v-if="isOpen"
      ref="langBlock"
      data-testid="lang-block"
      class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-3 bg-white rounded-md shadow-md font-semibold"
    >
      <ul>
        <li
          v-for="{ code, name } of locales"
          :key="code"
          class="mb-1 last:mb-0 cursor-pointer hover:underline"
          @click="changeLanguage(code)"
        >
          {{ name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import useClickOutside from '@shared/composable/useClickOutside';

// Робота з відкриванням
const isOpen = ref(false);
const langBlock = ref(null);

function toggleBlock() {
  isOpen.value = !isOpen.value;
}

useClickOutside(langBlock, isOpen, toggleBlock);

// Робота зі зміною мови
const { locale, locales, setLocale } = useI18n();

type AvailableLocale = (typeof locales.value)[number]['code'];

async function changeLanguage(lang: AvailableLocale) {
  try {
    await setLocale(lang);
  } catch (error) {
    console.error('Failed to change language:', error);
  } finally {
    toggleBlock();
  }
}
</script>
