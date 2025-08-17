<template>
  <nav data-testid="navigation">
    <ul class="flex gap-8">
      <li v-for="{ link, name } of navigation" :key="link" class="li-hover">
        <NuxtLink v-if="!link.startsWith('#')" class="text-white text-xl font-bold" :to="link">
          {{ $t(name) }}
        </NuxtLink>
        <a
          v-else
          class="text-white text-xl font-bold"
          :href="link"
          @click.prevent="onAnchorClick(link)"
        >
          {{ $t(name) }}
        </a>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { navigation } from '@shared/constants';

function onAnchorClick(link: string) {
  const id = link.replace('#', '');
  const el = document.getElementById(id);

  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  } else {
    console.error(`Element with id "${id}" not found.`);
  }
}
</script>

<style lang="scss" scoped>
.li-hover {
  &:nth-child(odd):hover a {
    @apply text-primary;
  }

  &:nth-child(even):hover a {
    @apply text-secondary;
  }
}
</style>
