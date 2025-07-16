<template>
  <div class="min-h-screen grid grid-rows-[var(--header-height)_1fr_500px]">
    <Header />

    <main>
      <NuxtPage />
    </main>

    <Footer />
  </div>
</template>

<script setup lang="js">
import { Footer } from '@widgets/footer/index';
import { Header } from '@widgets/header/index';
</script>
