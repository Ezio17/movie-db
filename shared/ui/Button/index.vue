<template>
  <button :disabled="disabled" :class="[computedClass, classes]">
    <slot />
  </button>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

interface ButtonProps {
  /**
   * Класи для кнопки. Використовується для задання властивостей кнопки.
   */
  classes?: string;
  /**
   * Тема кнопки яка робить її візуально різною. Дефолтна - default
   */
  variant?: 'default' | 'rounded' | 'empty';
  /**
   * Розмір кнопки відповідно до дизайнту. Дефолтна - md. sm - 98px / md - 128px / lg - 144px
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Флаг, який відповідає за роботу кнопки. Дефолтна - false
   */
  disabled?: boolean;
  /**
   * Флаг, який відповідає за повну ширину кнопки. Дефолтна - false
   */
  fullWidth?: boolean;
}

const props = withDefaults(defineProps<ButtonProps>(), {
  variant: 'default',
  size: 'md',
  disabled: false,
  fullWidth: false,
});

const baseClasses = computed(() => {
  return 'h-10 text-xl font-bold tracking-widest transition-colors duration-200';
});

const widthClass = computed(() => {
  if (props.fullWidth) return 'w-full';

  const sizeMap = {
    sm: 'w-[98px]',
    md: 'w-[128px]',
    lg: 'w-[144px]',
  };

  return sizeMap[props.size];
});

const disabledClasses = computed(() => (props.disabled ? 'opacity-50 cursor-not-allowed' : ''));

const variantClasses = computed(() => {
  const variants = {
    default: 'bg-zinc-900 text-white hover:bg-zinc-700 disabled:hover:bg-zinc-900',
    rounded:
      'bg-zinc-900 text-white hover:bg-zinc-700 disabled:hover:bg-zinc-900 rounded-md border border-rose-600',
    empty: 'text-black border border-lime-500 hover:bg-lime-50 disabled:hover:bg-transparent',
  };

  return variants[props.variant];
});

const computedClass = computed(() =>
  [baseClasses.value, widthClass.value, disabledClasses.value, variantClasses.value]
    .filter(Boolean)
    .join(' ')
);
</script>
