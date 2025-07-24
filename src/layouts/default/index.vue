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
import { Footer } from '@widgets/footer/index';
import { Header } from '@widgets/header/index';
import { MobileNavigation } from '@widgets/mobileNavigation/index';

const isOpenMenu = ref(false);

function toggleMenu() {
  isOpenMenu.value = !isOpenMenu.value;
}
</script>
