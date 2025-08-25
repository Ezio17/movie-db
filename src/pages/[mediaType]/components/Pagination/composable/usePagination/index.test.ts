import { ref } from 'vue';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import usePagination from '.';

vi.mock('@shared/composable', () => ({
  useScreenSize: () => ({ isMobile: ref(false) }),
}));

describe('usePagination', () => {
  afterEach(() => {
    vi.resetModules();
    vi.restoreAllMocks();
  });

  it('should correctly detect first page', () => {
    const { isFirstPage, isLastPage } = usePagination(ref(10), ref(1));

    expect(isFirstPage.value).toBe(true);
    expect(isLastPage.value).toBe(false);
  });

  it('should correctly detect last page', () => {
    const { isFirstPage, isLastPage } = usePagination(ref(10), ref(10));

    expect(isFirstPage.value).toBe(false);
    expect(isLastPage.value).toBe(true);
  });

  it('should correctly generate pages when there are fewer than standard middle pages count', () => {
    const { pagesList } = usePagination(ref(3), ref(2));

    expect(pagesList.value).toEqual([1, 2, 3]);
  });

  it('should correctly generate pages when active page is 1', () => {
    const { pagesList } = usePagination(ref(20), ref(1));

    const firstPage = 1;
    const middlePages = [2, 3, 4, 5, 6];
    const rightSide = [11, 16];
    const lastPage = 20;

    expect(pagesList.value).toEqual([firstPage, ...middlePages, ...rightSide, lastPage]);
  });

  it('should correctly generate pages when active page is 2', () => {
    const { pagesList } = usePagination(ref(10), ref(2));

    const firstPage = 1;
    const currentPage = 2;
    const middlePages = [3, 4, 5];
    const rightSide = [7, 9];
    const lastPage = 10;

    expect(pagesList.value).toEqual([
      firstPage,
      currentPage,
      ...middlePages,
      ...rightSide,
      lastPage,
    ]);
  });

  it('should correctly generate pages when active page is last', () => {
    const { pagesList } = usePagination(ref(20), ref(20));

    const firstPage = 1;
    const middlePages = [15, 16, 17, 18, 19];
    const leftSide = [6, 11];
    const lastPage = 20;

    expect(pagesList.value).toEqual([firstPage, ...leftSide, ...middlePages, lastPage]);
  });

  it('should correctly generate pages when active page is second to last', () => {
    const { pagesList } = usePagination(ref(15), ref(14));

    const firstPage = 1;
    const leftSide = [5, 9];
    const currentPage = 14;
    const lastPage = 15;

    expect(pagesList.value).toEqual([firstPage, ...leftSide, currentPage, lastPage]);
  });

  it('should correctly generate pages when active page is central', () => {
    const { pagesList } = usePagination(ref(20), ref(10));

    const firstPage = 1;
    const leftSide = [4, 7];
    const middlePages = [10, 11, 12, 13];
    const rightSide = [15, 17];
    const lastPage = 20;

    expect(pagesList.value).toEqual([
      firstPage,
      ...leftSide,
      ...middlePages,
      ...rightSide,
      lastPage,
    ]);
  });
});

describe('usePagination - mobile', () => {
  let usePaginationMobile: typeof usePagination;

  beforeEach(async () => {
    vi.doMock('@shared/composable', () => ({
      useScreenSize: () => ({ isMobile: ref(true) }),
    }));

    const module = await import('.');

    usePaginationMobile = module.default;
  });

  afterEach(() => {
    vi.resetModules();
    vi.restoreAllMocks();
  });

  it('should not generate left or right sides on mobile screen size', () => {
    const { pagesList } = usePaginationMobile(ref(500), ref(250));

    expect(pagesList.value).toEqual([1, 250, 251, 252, 253, 500]);
  });

  it('should generate fewer next pages when active page is 1', () => {
    const { pagesList } = usePaginationMobile(ref(500), ref(1));

    expect(pagesList.value).toEqual([1, 2, 3, 4, 500]);
  });

  it('should generate fewer previous pages when active page is last', () => {
    const { pagesList } = usePaginationMobile(ref(500), ref(500));

    expect(pagesList.value).toEqual([1, 497, 498, 499, 500]);
  });
});
