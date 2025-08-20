import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import Pagination from './index.vue';

const meta: Meta<typeof Pagination> = {
  title: 'Pagination/Components/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  argTypes: {
    totalPages: { control: 'number', description: 'Кількість сторінок' },
    currentPage: { control: 'number', description: 'Номер поточного сторінки' },

    onClickPrev: { action: 'clickPrev' },
    onClickNext: { action: 'clickNext' },
    onClickPage: { action: 'clickPage' },
  },
  args: {
    totalPages: 10,
    currentPage: 1,
  },
};

export default meta;

type Story = StoryObj<typeof Pagination>;

export const Interactive: Story = {
  args: {
    totalPages: 20,
    currentPage: 1,
  },
  render: (args) => ({
    components: { Pagination },
    setup() {
      const currentPage = ref(args.currentPage);

      const handleClickPrev = () => {
        if (currentPage.value > 1) {
          currentPage.value -= 1;
        }
      };

      const handleClickNext = () => {
        if (currentPage.value < args.totalPages) {
          currentPage.value += 1;
        }
      };

      const handleClickPage = (page: number) => {
        currentPage.value = page;
      };

      return {
        args,
        currentPage,
        handleClickPrev,
        handleClickNext,
        handleClickPage,
      };
    },
    template: `
      <Pagination 
        :totalPages="args.totalPages" 
        :currentPage="currentPage"
        @clickPrev="handleClickPrev"
        @clickNext="handleClickNext"
        @clickPage="handleClickPage"
      />
    `,
  }),
};

export const ActiveFirstPage: Story = {
  args: {
    totalPages: 10,
    currentPage: 1,
  },
};

export const ActiveSecondPage: Story = {
  args: {
    totalPages: 25,
    currentPage: 2,
  },
};

export const ActiveLastPage: Story = {
  args: {
    totalPages: 100,
    currentPage: 100,
  },
};

export const ActiveSecondToLastPage: Story = {
  args: {
    totalPages: 100,
    currentPage: 99,
  },
};

export const ActiveMiddlePage: Story = {
  args: {
    totalPages: 500,
    currentPage: 232,
  },
};
