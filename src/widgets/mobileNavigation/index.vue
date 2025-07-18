<template>
  <MenuOverlay :is-open="isOpenMenu" @close="closeMenu" />

  <SideMenu :is-open="isOpenMenu" @close="closeMenu">
    <MobileNavigation />
  </SideMenu>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, watch } from 'vue';
import { useScrollLock } from '@shared/composable';
import { MenuOverlay, MobileNavigation, SideMenu } from './components';

interface Props {
  isOpenMenu: boolean;
}

const props = defineProps<Props>();

const emit = defineEmits<{ closeMenu: [] }>();

const closeMenu = () => {
  emit('closeMenu');
};

const { lock, unlock } = useScrollLock();

watch(
  () => props.isOpenMenu,
  (val) => {
    if (val) {
      lock();
    } else {
      unlock();
    }
  }
);
</script>

<style scoped>
.slide-left-enter-active,
.slide-left-leave-active {
  transition: transform 0.3s ease;
}
.slide-left-enter-from,
.slide-left-leave-to {
  transform: translateX(-100%);
}
.slide-left-enter-to,
.slide-left-leave-from {
  transform: translateX(0);
}
</style>
