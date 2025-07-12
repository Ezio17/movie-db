// src/shared/ui/BaseButton.stories.ts
// eslint-disable-next-line storybook/no-renderer-packages
import type { Meta, StoryObj } from '@storybook/vue3';
import BaseButton from './index.vue';

const meta: Meta<typeof BaseButton> = {
  title: 'Shared/UI/Button',
  component: BaseButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Базовий компонент кнопки з підтримкою різних варіантів, розмірів та станів.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'rounded', 'empty'],
      description: 'Тема кнопки яка робить її візуально різною',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Розмір кнопки відповідно до дизайну',
    },
    disabled: {
      control: 'boolean',
      description: 'Флаг, який відповідає за роботу кнопки',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Флаг, який відповідає за повну ширину кнопки',
    },
    classes: {
      control: 'text',
      description: 'Додаткові CSS класи для кнопки',
    },
  },
  args: {
    variant: 'default',
    size: 'md',
    disabled: false,
    fullWidth: false,
    classes: '',
  },
};

export default meta;
type Story = StoryObj<typeof BaseButton>;

// Основна історія з контейнером для fullWidth
export const Default: Story = {
  args: {
    variant: 'default',
    size: 'md',
    disabled: false,
    fullWidth: false,
  },
  render: (args) => ({
    components: { BaseButton },
    setup() {
      return { args };
    },
    template: `
      <div class="w-80">
        <BaseButton v-bind="args">Кнопка</BaseButton>
      </div>
    `,
  }),
};

// Всі варіанти
export const Variants: Story = {
  render: () => ({
    components: { BaseButton },
    template: `
      <div class="flex gap-6 flex-wrap">
        <BaseButton variant="default">Default</BaseButton>
        <BaseButton variant="rounded">Rounded</BaseButton>
        <BaseButton variant="empty">Empty</BaseButton>
      </div>
    `,
  }),
};

// Всі розміри
export const Sizes: Story = {
  render: () => ({
    components: { BaseButton },
    template: `
      <div class="flex gap-6 items-center flex-wrap">
        <BaseButton size="sm">Small</BaseButton>
        <BaseButton size="md">Medium</BaseButton>
        <BaseButton size="lg">Large</BaseButton>
      </div>
    `,
  }),
};

// Стани disabled
export const Disabled: Story = {
  render: () => ({
    components: { BaseButton },
    template: `
      <div class="flex gap-6 flex-wrap">
        <BaseButton variant="default" disabled>Default Disabled</BaseButton>
        <BaseButton variant="rounded" disabled>Rounded Disabled</BaseButton>
        <BaseButton variant="empty" disabled>Empty Disabled</BaseButton>
      </div>
    `,
  }),
};

// Повна ширина - виправлена версія
export const FullWidth: Story = {
  render: () => ({
    components: { BaseButton },
    template: `
      <div class="w-96 space-y-6">
        <BaseButton classes="mb-4" variant="default" fullWidth>Full Width Default</BaseButton>
        <BaseButton variant="rounded" fullWidth>Full Width Rounded</BaseButton>
        <BaseButton variant="empty" fullWidth>Full Width Empty</BaseButton>
      </div>
    `,
  }),
};

// Порівняння звичайних та fullWidth кнопок
export const FullWidthComparison: Story = {
  render: () => ({
    components: { BaseButton },
    template: `
      <div class="w-96 space-y-8">
        <div>
          <h3 class="mb-4 text-sm font-medium text-gray-700">Звичайні кнопки:</h3>
          <div class="flex gap-6 flex-wrap">
            <BaseButton variant="default" size="sm">Small</BaseButton>
            <BaseButton variant="default" size="md">Medium</BaseButton>
            <BaseButton variant="default" size="lg">Large</BaseButton>
          </div>
        </div>
        
        <div class="mt-4">
          <h3 class="mb-4 text-sm font-medium text-gray-700">Кнопки на повну ширину:</h3>
          <div class="flex flex-col gap-6 space-y-4">
            <BaseButton variant="default" size="sm" fullWidth>Small Full Width</BaseButton>
            <BaseButton variant="default" size="md" fullWidth>Medium Full Width</BaseButton>
            <BaseButton variant="default" size="lg" fullWidth>Large Full Width</BaseButton>
          </div>
        </div>
      </div>
    `,
  }),
};

// Комбіновані стани
export const Combined: Story = {
  render: () => ({
    components: { BaseButton },
    template: `
      <div class="flex flex-col gap-6 space-y-8">
        <div class="flex gap-6 flex-wrap">
          <BaseButton variant="default" size="sm">Small Default</BaseButton>
          <BaseButton variant="rounded" size="md">Medium Rounded</BaseButton>
          <BaseButton variant="empty" size="lg">Large Empty</BaseButton>
        </div>
        <div class="flex gap-6 flex-wrap">
          <BaseButton variant="default" size="sm" disabled>Small Disabled</BaseButton>
          <BaseButton variant="rounded" size="md" disabled>Medium Disabled</BaseButton>
          <BaseButton variant="empty" size="lg" disabled>Large Disabled</BaseButton>
        </div>
      </div>
    `,
  }),
};

// Інтерактивний приклад з контейнером
export const Interactive: Story = {
  args: {
    variant: 'default',
    size: 'md',
    disabled: false,
    fullWidth: false,
  },
  render: (args) => ({
    components: { BaseButton },
    setup() {
      const handleClick = () => {
        alert('Кнопка натиснута!');
      };

      return { args, handleClick };
    },
    template: `
      <div class="w-80">
        <BaseButton 
          v-bind="args" 
          @click="handleClick"
        >
          Натисни мене
        </BaseButton>
      </div>
    `,
  }),
};

// Довгий текст
export const LongText: Story = {
  render: () => ({
    components: { BaseButton },
    template: `
      <div class="flex flex-col gap-6 space-y-8">
        <div>
          <h3 class="mb-4 text-sm font-medium text-gray-700">Фіксована ширина (може обрізатися):</h3>
          <div class="space-y-4">
            <BaseButton variant="default" size="sm">Дуже довгий текст кнопки</BaseButton>
            <BaseButton variant="rounded" size="md">Ще довший текст для кнопки</BaseButton>
            <BaseButton variant="empty" size="lg">Максимально довгий текст для кнопки</BaseButton>
          </div>
        </div>
        
        <div class="w-96">
          <h3 class="mb-4 text-sm font-medium text-gray-700">Повна ширина:</h3>
          <div class="flex flex-col gap-6 space-y-4">
            <BaseButton variant="default" size="sm" fullWidth>Дуже довгий текст кнопки</BaseButton>
            <BaseButton variant="rounded" size="md" fullWidth>Ще довший текст для кнопки</BaseButton>
            <BaseButton variant="empty" size="lg" fullWidth>Максимально довгий текст для кнопки</BaseButton>
          </div>
        </div>
      </div>
    `,
  }),
};

// Кастомні класи
export const CustomClasses: Story = {
  render: () => ({
    components: { BaseButton },
    template: `
      <div class="flex gap-6 flex-wrap">
        <BaseButton variant="default" classes="shadow-lg">З тінню</BaseButton>
        <BaseButton variant="rounded" classes="uppercase">Великими літерами</BaseButton>
        <BaseButton variant="empty" classes="italic">Курсивом</BaseButton>
      </div>
    `,
  }),
};
