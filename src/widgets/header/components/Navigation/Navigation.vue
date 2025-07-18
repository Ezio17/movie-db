<template>
  <nav data-testid="navigation">
    <ul class="flex gap-8">
      <li v-for="{ link, name } of navigation" :key="link" class="li-hover">
        <NuxtLink class="text-white text-xl font-bold" :to="link">
          {{ $t(name) }}
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { navigation } from '@shared/constants';
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
