import type { Meta, StoryObj } from '@storybook/vue3';
import Loader from './Loader.vue';

const meta: Meta<typeof Loader> = {
  title: 'Shared/UI/Loader',
  component: Loader,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Loader>;

export const Default: Story = {
  name: 'Default Loader',
};
