<template>
  <select
    :value="modelValue"
    class="block pl-4 pr-10 py-2 border border-gray-200 rounded-xl shadow focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-white text-gray-900 transition duration-150 ease-in-out hover:border-primary"
    @change="onChange"
  >
    <option v-if="placeholder" value="">{{ placeholder }}</option>
    <option
      v-for="option in options"
      :key="option.id"
      :value="String(option.id)"
      :selected="String(option.id) === modelValue"
    >
      {{ option.name }}
    </option>
  </select>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

interface Props {
  /**
   * Список опцій для вибору.
   */
  options: Array<{
    id: string | number;
    name: string;
  }>;

  /**
   * Поточне значення селекту для двостороннього зв'язування з v-model.
   */
  modelValue: string | number;

  /**
   * Плейсхолдер для першої опції (необов'язково).
   */
  placeholder?: string;
}

defineProps<Props>();

const emit = defineEmits<{
  'update:modelValue': [value: string];
}>();

function onChange(event: Event) {
  const { value } = event.target as HTMLSelectElement;

  emit('update:modelValue', value);
}
</script>

<style lang="scss" scoped>
select {
  -moz-appearance: none;
  -webkit-appearance: none;
  background-image: url("data:image/svg+xml;utf8,<svg fill='black' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>");
  background-repeat: no-repeat;
  background-position-x: 99%;
  background-position-y: 50%;
  margin-right: 2rem;
}
</style>
