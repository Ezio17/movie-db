import type { Meta, StoryObj } from '@storybook/vue3';
import Select from './index.vue';

const meta: Meta<typeof Select> = {
  title: 'Shared/UI/Select',
  component: Select,
  tags: ['autodocs'],
  argTypes: {
    options: {
      control: 'object',
      description: 'Список опцій для вибору.',
    },
    modelValue: {
      control: 'text',
      description: 'Поточне значення селекту.',
    },
    placeholder: {
      control: 'text',
      description: 'Текст-підказка, яка відображається, коли нічого не вибрано.',
    },
  },
  args: {
    options: [
      { id: '1', name: 'Option 1' },
      { id: '2', name: 'Option 2' },
      { id: '3', name: 'Option 3' },
    ],
    modelValue: '',
    placeholder: 'Select an option',
  },
};

export default meta;

type Story = StoryObj<typeof Select>;

export const Default: Story = {
  args: {
    options: [
      { id: '1', name: 'Option 1' },
      { id: '2', name: 'Option 2' },
      { id: '3', name: 'Option 3' },
    ],
    modelValue: '',
    placeholder: 'Select an option',
  },
};

export const WithSelectedValue: Story = {
  args: {
    options: [
      { id: '1', name: 'Option 1' },
      { id: '2', name: 'Option 2' },
      { id: '3', name: 'Option 3' },
    ],
    modelValue: '2',
    placeholder: 'Select an option',
  },
};

export const NoPlaceholder: Story = {
  args: {
    options: [
      { id: '1', name: 'Option 1' },
      { id: '2', name: 'Option 2' },
      { id: '3', name: 'Option 3' },
    ],
    modelValue: '',
    placeholder: '',
  },
};
