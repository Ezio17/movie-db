<template>
  <div class="min-h-screen grid grid-rows-[80px_1fr_500px]">
    <Header />

    <main>
      <NuxtPage />
    </main>

    <Footer />
  </div>
</template>

<script setup lang="js">
import { Footer } from '~/features/footer/index';
import { Header } from '~/features/header/index';
</script>
