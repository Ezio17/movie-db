<template>
  <footer
    class="footer-bg w-screen bg-cover bg-center flex flex-col items-center justify-center text-white"
  >
    <h2 class="text-4xl mb-10">{{ $t('contacts') }}</h2>

    <ContactList />
  </footer>
</template>

<script setup lang="ts">
import ContactList from './components/ContactList/ContactList.vue';
</script>

<style lang="scss" scoped>
.footer-bg {
  background-image:
    radial-gradient(circle at 20% 50%, rgba(3, 6, 11, 0.98) 0%, rgba(48, 68, 77, 0.88) 100%),
    url('https://image.tmdb.org/t/p/w1280/eVPs2Y0LyvTLZn6AP5Z6O2rtiGB.jpg');
}
</style>
