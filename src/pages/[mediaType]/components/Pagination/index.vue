<template>
  <ul v-if="totalPages > 1" class="flex gap-2">
    <PaginationButton data-testid="prev-btn" :disabled="isFirstPage" @click="$emit('clickPrev')"
      >Prev</PaginationButton
    >

    <li
      v-for="page of pagesList"
      :key="page"
      class="h-14 min-w-14 px-2 bg-neutral-900 text-neutral-200 rounded-sm font-bold text-xl flex justify-center items-center cursor-pointer"
      :class="{ 'text-primary': page === currentPage }"
      data-testid="middle-btn"
      @click="$emit('clickPage', page)"
    >
      {{ page }}
    </li>

    <PaginationButton data-testid="next-btn" :disabled="isLastPage" @click="$emit('clickNext')"
      >Next</PaginationButton
    >
  </ul>
</template>

<script setup lang="ts">
import { toRefs } from 'vue';
import { PaginationButton } from './ui';
import { usePagination } from './composable';

interface Props {
  totalPages: number;
  currentPage: number;
}

const props = defineProps<Props>();
const { totalPages, currentPage } = toRefs(props);

defineEmits<{
  clickPrev: [];
  clickNext: [];
  clickPage: [page: number];
}>();

const { pagesList, isFirstPage, isLastPage } = usePagination(totalPages, currentPage);
</script>
