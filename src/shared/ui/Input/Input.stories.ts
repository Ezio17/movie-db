import type { Meta, StoryObj } from '@storybook/vue3';
import Input from './Input.vue';

const meta: Meta<typeof Input> = {
  title: 'Shared/UI/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password'],
    },
    modelValue: {
      control: 'text',
    },
    placeholder: {
      control: 'text',
      description: 'Текст-підказка, яка відображається всередині інпуту, коли він порожній.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '""' },
      },
    },
  },
  args: {
    modelValue: '',
    type: 'text',
    placeholder: 'Type here...',
  },
};

export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {
  name: 'Text Input',
  args: {
    placeholder: 'Enter text...',
  },
};

export const WithEmailType: Story = {
  args: {
    type: 'email',
    modelValue: 'example@email.com',
    placeholder: 'Enter your email',
  },
  name: 'Email Input',
};

export const PasswordInput: Story = {
  args: {
    type: 'password',
    modelValue: 'secret',
    placeholder: 'Enter your password',
  },
  name: 'Password Input',
};
