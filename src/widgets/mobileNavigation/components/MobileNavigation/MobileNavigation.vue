<template>
  <nav class="flex flex-col items-center p-6">
    <ul class="flex flex-col gap-6">
      <li v-for="{ link, name } of navigation" :key="link" class="li-hover">
        <NuxtLink class="text-secondary text-xl font-bold hover:underline" :to="link">
          {{ $t(name) }}
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { navigation } from '@shared/constants';
</script>
