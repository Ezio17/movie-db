<template>
  <header class="w-full bg-zinc-900 fixed z-10 h-[var(--header-height)]">
    <div class="wrap h-full relative flex items-center gap-3">
      <NuxtLink class="sm:mr-16" to="/">
        <img :src="primaryGreenLogo" alt="logo" class="min-w-14 min-h-14" />
      </NuxtLink>

      <Navigation class="hidden md:block" />

      <div
        class="flex justify-center flex-col md:flex-row items-center h-full gap-4 md:gap-8 ml-auto"
      >
        <div class="flex justify-end items-center gap-6 w-full md:w-auto">
          <Language />

          <BurgerButton class="sm:ml-2 md:hidden" @toggle="emit('toggle-mobile-menu')" />
        </div>

        <div class="flex flex-grow-1 justify-end items-center relative max-w-[200px]">
          <Input
            v-model.trim="searchValue"
            :placeholder="$t('find a movie')"
            class="w-full"
            @focus="searchInputFocus"
          />
        </div>
      </div>

      <SearchResults
        v-if="isResultsOpen"
        ref="searchBlock"
        :movies="movies"
        :pending="pending"
        :error-message="error?.message || ''"
        @close="closeSearchResults"
      />
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import { useClickOutside } from '@shared/composable';
import { Navigation, Language, SearchResults } from './components';
import { useMovieSearch } from './api';
import { BurgerButton } from './ui';
import primaryGreenLogo from '@/assets/svg/primary-green-logo.svg';

const emit = defineEmits<{
  'toggle-mobile-menu': [];
}>();

// Пошук фільма
const searchValue = ref('');
const isResultsOpen = ref(false);
const searchBlock = ref<InstanceType<typeof SearchResults> | null>(null);

const { data: movies, pending, error } = useMovieSearch(searchValue);

function openSearchResults() {
  isResultsOpen.value = true;
}

function closeSearchResults() {
  isResultsOpen.value = false;
}

function searchInputFocus() {
  if (searchValue.value.trim()) {
    openSearchResults();
  }
}

watch(pending, () => {
  if (pending.value === false) {
    openSearchResults();
  }
});

const exposedEl = computed(() => searchBlock.value?.innerEl || null);

useClickOutside(exposedEl, isResultsOpen, closeSearchResults, true);
</script>
