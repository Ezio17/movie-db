import { describe, expect, it } from 'vitest';
import { DOMWrapper, mount } from '@vue/test-utils';
import Pagination from './index.vue';

const createWrapper = (props = {}) => {
  return mount(Pagination, {
    props: {
      totalPages: 500,
      currentPage: 400,
      ...props,
    },
  });
};

describe('Pagination', () => {
  it('should not render when there is only one page', () => {
    const wrapper = createWrapper({ totalPages: 1, currentPage: 1 });

    expect(wrapper.find('ul').exists()).toBeFalsy();
  });

  it('should render correct page numbers according to pagesList', () => {
    const wrapper = createWrapper();
    const allList = wrapper.findAll('li').map((li) => Number(li.text()));

    expect(allList).toEqual([1, 134, 267, 400, 401, 402, 403, 435, 467, 500]);
  });

  it('should disable prev button when on first page', () => {
    const wrapper = createWrapper({ totalPages: 5, currentPage: 1 });
    const prevBtn = wrapper.find('[data-testid="prev-btn"]') as DOMWrapper<HTMLLIElement>;

    expect(prevBtn.classes()).toContain('pointer-events-none');
  });

  it('should disable next button when on last page', () => {
    const wrapper = createWrapper({ totalPages: 5, currentPage: 5 });
    const nextBtn = wrapper.find('[data-testid="next-btn"]') as DOMWrapper<HTMLLIElement>;

    expect(nextBtn.classes()).toContain('pointer-events-none');
  });

  it('should emit clickPrev event when prev button is clicked', async () => {
    const wrapper = createWrapper({ totalPages: 5, currentPage: 2 });
    const prevBtn = wrapper.find('[data-testid="prev-btn"]');

    await prevBtn.trigger('click');

    expect(wrapper.emitted('clickPrev')).toHaveLength(1);
  });

  it('should emit clickNext event when next button is clicked', async () => {
    const wrapper = createWrapper({ totalPages: 5, currentPage: 2 });
    const nextBtn = wrapper.find('[data-testid="next-btn"]');

    await nextBtn.trigger('click');

    expect(wrapper.emitted('clickNext')).toHaveLength(1);
  });

  it('should emit clickPage event with correct page number when page button is clicked', async () => {
    const wrapper = createWrapper({ totalPages: 5, currentPage: 2 });
    const middleBtns = wrapper.findAll('[data-testid="middle-btn"]');
    const pageFourBtn = middleBtns.find((btn) => btn.text() === '4');

    await pageFourBtn!.trigger('click');

    const clickPageEvents = wrapper.emitted('clickPage');

    expect(clickPageEvents).toHaveLength(1);
    expect(clickPageEvents![0]).toEqual([4]);
  });

  it('should highlight current page with primary text color', () => {
    const wrapper = createWrapper({ totalPages: 5, currentPage: 3 });
    const middleBtns = wrapper.findAll('[data-testid="middle-btn"]');

    const currentPageBtn = middleBtns.find((btn) => btn.text() === '3');
    const otherPageBtn = middleBtns.find((btn) => btn.text() === '4');

    expect(currentPageBtn!.classes()).toContain('text-primary');
    expect(otherPageBtn!.classes()).not.toContain('text-primary');
  });
});
