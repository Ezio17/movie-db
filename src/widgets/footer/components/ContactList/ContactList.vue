<template>
  <ul>
    <li
      v-for="{ title, text, href } of contacts"
      :key="title"
      class="md:text-xl flex items-center gap-4 mb-4"
    >
      <span class="min-w-20 text-nowrap">{{ $t(title) }}: </span
      ><span
        ><a
          :href="href"
          target="_blank"
          rel="noopener noreferrer"
          class="text-white hover:underline"
          >{{ text }}</a
        ></span
      >
    </li>
  </ul>
</template>

<script setup lang="ts">
import { contacts } from '@widgets/footer/constants';
</script>
