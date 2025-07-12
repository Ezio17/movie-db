<template>
  <div>main!</div>
  <p class="text-center">Count: {{ counter.count }}</p>
  <p>Double: {{ counter.doubleCount }}</p>
  <button @click="counter.increment()">Increment</button>
  <Button />
</template>

<script setup lang="ts">
import Button from './shared/ui/Button/Button.vue';

const counter = useCounterStore();
</script>
