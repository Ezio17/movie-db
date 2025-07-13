<template>
  <div>
    <div>main!</div>
    <p class="text-center">Count: {{ counter.count }}</p>
    <p>Double: {{ counter.doubleCount }}</p>
    <p>Fourth: {{ counter.doubleCount * 2 }}</p>
    <button @click="counter.increment()">Increment</button>
    <Button variant="rounded">{{ $t('hello') }}</Button>
  </div>
</template>

<script setup lang="ts">
const counter = useCounterStore();
</script>
