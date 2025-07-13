<template>
  <div>main!</div>
  <p class="text-center">Count: {{ counter.count }}</p>
  <p>Double: {{ counter.doubleCount }}</p>
  <p>Fourth: {{ counter.doubleCount * 2 }}</p>
  <button @click="counter.increment()">Increment</button>
  <Button variant="rounded">{{ $t('hello') }}</Button>
</template>

<script setup lang="ts">
const counter = useCounterStore();

const { locale } = useI18n();

function switchLocale(lang: 'uk' | 'en' = 'en') {
  locale.value = lang;
}

onMounted(() => {
  switchLocale();

  setTimeout(() => {
    switchLocale('uk');
  }, 2000);
});
</script>
