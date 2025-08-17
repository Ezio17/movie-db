<template>
  <footer id="contacts" class="footer-bg bg-cover bg-center text-white mt-10">
    <div class="wrap h-full flex flex-col items-center justify-center">
      <h2 class="text-4xl mb-10">{{ $t('contacts') }}</h2>

      <ContactList />
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ContactList } from './components';
</script>

<style lang="scss" scoped>
.footer-bg {
  background-image:
    radial-gradient(circle at 20% 50%, rgba(3, 6, 11, 0.98) 0%, rgba(48, 68, 77, 0.88) 100%),
    url('https://image.tmdb.org/t/p/w1280/eVPs2Y0LyvTLZn6AP5Z6O2rtiGB.jpg');
}
</style>
