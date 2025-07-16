<template>
  <Slider :movies="popularMovie?.results || null" />
</template>

<script setup lang="ts">
import { Slider } from './widgets/slider';
import { usePopularMovie } from './api';

const { data: popularMovie } = usePopularMovie();
</script>
