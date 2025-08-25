import { ref, computed, watch, type Ref } from 'vue';
import { useScreenSize } from '@shared/composable';

export default function usePagination(totalPages: Ref<number>, currentPage: Ref<number>) {
  const { isMobile } = useScreenSize();
  const pagesList = ref<number[]>([]);

  const isFirstPage = computed(() => currentPage.value === 1);
  const isLastPage = computed(() => currentPage.value === totalPages.value);
  const countMiddlePages = computed(() =>
    (isFirstPage.value || isLastPage.value) && !isMobile.value ? 5 : 3
  );

  const fillMiddlePages = (lastPage: number, startsWith = 1) => {
    const result: number[] = [];

    for (let i = startsWith; i <= lastPage; i += 1) {
      result.push(i);
    }

    return result;
  };

  const fillRightSide = () => {
    if (isMobile.value) {
      return [];
    }

    const result: number[] = [];

    let lastMiddlePage = currentPage.value + countMiddlePages.value;

    if (lastMiddlePage > totalPages.value) {
      return [];
    }

    const PAGES_SLICE = 3;
    const pagesLeft = totalPages.value - lastMiddlePage;
    const increaseCount = Math.round(pagesLeft / PAGES_SLICE);

    let steps = 2;

    while (steps > 0 && increaseCount > 1) {
      const page = Math.ceil(lastMiddlePage + increaseCount);

      if (page >= totalPages.value) {
        break;
      }

      result.push(page);

      lastMiddlePage = page;
      steps -= 1;
    }

    return result;
  };

  const fillLeftSide = () => {
    if (isMobile.value) {
      return [];
    }

    const result: number[] = [];

    let pagesLeft = currentPage.value - 1;

    if (isLastPage.value) {
      pagesLeft -= countMiddlePages.value;
    }

    if (pagesLeft <= 1) {
      return [];
    }

    const PAGES_SLICE = 3;
    const decreaseCount = Math.round(pagesLeft / PAGES_SLICE);
    let startPage = 1;

    let steps = 2;

    while (steps > 0 && decreaseCount > 1) {
      const page = Math.ceil(startPage + decreaseCount);

      if (page >= currentPage.value) {
        break;
      }

      result.push(page);

      startPage = page;
      steps -= 1;
    }

    return result;
  };

  const generatePages = (): void => {
    let result: number[] = [];

    // Якщо сторінок менше countMiddlePages
    if (countMiddlePages.value >= totalPages.value) {
      result = result.concat(fillMiddlePages(totalPages.value));

      pagesList.value = result;

      return undefined;
    }

    // Перша сторінка
    if (isFirstPage.value) {
      result = result.concat(
        fillMiddlePages(countMiddlePages.value + currentPage.value),
        fillRightSide(),
        totalPages.value
      );

      pagesList.value = result;

      return undefined;
    }

    // Остання сторінка
    if (isLastPage.value) {
      const lastPrevPage = totalPages.value - countMiddlePages.value;

      for (let i = totalPages.value; i >= lastPrevPage; i -= 1) {
        result.unshift(i);
      }

      result.unshift(1, ...fillLeftSide());

      pagesList.value = result;

      return undefined;
    }

    // Центральна сторінка
    const FIRST_PAGE = 1;
    const lastMiddlePage = currentPage.value + countMiddlePages.value;
    const penultimatePage = totalPages.value - 1;
    const lastAvailablePage = Math.min(lastMiddlePage, penultimatePage);

    result = result.concat(
      FIRST_PAGE,
      fillLeftSide(),
      fillMiddlePages(lastAvailablePage, currentPage.value),
      fillRightSide(),
      totalPages.value
    );

    pagesList.value = result;

    return undefined;
  };

  watch(
    [currentPage, totalPages, isMobile],
    () => {
      generatePages();
    },
    { immediate: true }
  );

  return {
    pagesList,
    isFirstPage,
    isLastPage,
  };
}
