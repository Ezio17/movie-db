<template>
  <NuxtLoadingIndicator color="#22c55e" />

  <div class="min-h-screen grid grid-rows-[1fr_500px]">
    <Header @toggle-mobile-menu="toggleMenu" />

    <MobileNavigation :is-open-menu="isOpenMenu" @close-menu="isOpenMenu = false" />

    <main class="mt-[var(--header-height)]">
      <NuxtPage />
    </main>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Footer } from '@widgets/Footer/index';
import { Header } from '@widgets/Header/index';
import { MobileNavigation } from '@widgets/MobileNavigation/index';

const isOpenMenu = ref(false);

function toggleMenu() {
  isOpenMenu.value = !isOpenMenu.value;
}
</script>
