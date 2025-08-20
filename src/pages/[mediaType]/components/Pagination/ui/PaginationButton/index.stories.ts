import type { Meta, StoryObj } from '@storybook/vue3';
import PaginationButton from './index.vue';

const meta: Meta<typeof PaginationButton> = {
  title: 'Pagination/UI/PaginationButton',
  component: PaginationButton,
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      control: { type: 'boolean' },
      description: 'Неактивна кнопка.',
    },
    default: { control: 'text', description: 'Текст кнопки.' },
  },
  args: {
    disabled: false,
    default: 'Test',
  },
};

export default meta;

type Story = StoryObj<typeof PaginationButton>;

export const Prev: Story = {
  args: {
    default: 'Prev',
  },
  render: (args) => ({
    components: { PaginationButton },
    setup() {
      return { args };
    },
    template: '<PaginationButton v-bind="args">{{ args.default }}</PaginationButton>',
  }),
};

export const Next: Story = {
  args: {
    default: 'Next',
  },
  render: (args) => ({
    components: { PaginationButton },
    setup() {
      return { args };
    },
    template: '<PaginationButton v-bind="args">{{ args.default }}</PaginationButton>',
  }),
};

export const Disabled: Story = {
  args: {
    default: 'Disabled',
    disabled: true,
  },
  render: (args) => ({
    components: { PaginationButton },
    setup() {
      return { args };
    },
    template: '<PaginationButton :disabled="args.disabled">{{ args.default }}</PaginationButton>',
  }),
};
