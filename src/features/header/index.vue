<template>
  <header class="bg-gray-700">
    <div class="wrap h-full flex items-center border border-solid border-secondary">
      <NuxtLink class="mr-16" to="/">
        <img
          src="https://www.themoviedb.org/assets/2/v4/logos/primary-green-d70eebe18a5eb5b166d5c1ef0796715b8d1a2cbc698f96d311d62f894ae87085.svg"
          alt="logo"
          class="w-14 h-14"
        />
      </NuxtLink>

      <Navigation />

      <div class="flex flex-row gap-8 ml-auto">
        <Language />

        <input type="text" placeholder="Text" />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import Navigation from './components/Navigation/Navigation.vue';
import Language from './components/Language/Language.vue';
</script>
