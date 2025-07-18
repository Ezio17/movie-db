<template>
  <input
    :type="type"
    :value="modelValue"
    :placeholder="placeholder"
    class="px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary w-full"
    @input="handleInput"
    @focus="emit('focus')"
    @blur="emit('blur')"
  />
</template>

<script setup lang="ts">
interface Props {
  /**
   * Значення інпуту. Для двостороннього зв'язування з v-model.
   */
  modelValue: string;

  /**
   * Тип інпуту (наприклад, "text", "email", "password" тощо). Дефолтне значення — "text".
   */
  type?: string;

  /**
   * Текст-підказка, яка відображається всередині інпуту, коли він порожній.
   */
  placeholder: string;
}

withDefaults(defineProps<Props>(), { type: 'text' });

const emit = defineEmits<{
  'update:modelValue': [value: string];
  focus: [];
  blur: [];
}>();

function handleInput(e: Event) {
  const target = e.target as HTMLInputElement | null;

  if (target) {
    emit('update:modelValue', target.value);
  }
}
</script>
