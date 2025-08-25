<template>
  <ul v-if="totalPages > 1" class="flex gap-2">
    <PaginationButton
      v-if="!isMobile"
      data-testid="prev-btn"
      :disabled="isFirstPage"
      @click="$emit('clickPrev')"
    >
      <img class="h-14 rotate-[180deg]" height="12px" :src="rightArrow" alt="Prev" />
    </PaginationButton>

    <li
      v-for="page of pagesList"
      :key="page"
      class="h-10 md:h-14 w-10 md:w-14 px-[4px] md:px-2 bg-neutral-900 text-neutral-200 rounded-sm font-bold text-xl flex justify-center items-center cursor-pointer"
      :class="{ 'text-primary': page === currentPage }"
      data-testid="middle-btn"
      @click="$emit('clickPage', page)"
    >
      {{ page }}
    </li>

    <PaginationButton
      v-if="!isMobile"
      data-testid="next-btn"
      :disabled="isLastPage"
      @click="$emit('clickNext')"
    >
      <img class="h-14" :src="rightArrow" alt="Next" />
    </PaginationButton>
  </ul>
</template>

<script setup lang="ts">
import { toRefs } from 'vue';
import { useScreenSize } from '@shared/composable';
import { PaginationButton } from './ui';
import { usePagination } from './composable';
import rightArrow from '@/assets/svg/right-arrow.svg';

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

const { isMobile } = useScreenSize();
</script>
