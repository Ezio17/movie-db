import type { Ref } from 'vue';
import { watch, onBeforeUnmount } from 'vue';

export default function useClickOutside(
  targetRef: Ref<HTMLElement | null>,
  isOpen: Ref<boolean>,
  callback: () => void
) {
  function handler(event: MouseEvent) {
    if (!isOpen.value) return;

    if (targetRef.value && !targetRef.value.contains(event.target as Node)) {
      callback();
    }
  }

  watch(isOpen, (open) => {
    if (open) {
      window.addEventListener('click', handler);
    } else {
      window.removeEventListener('click', handler);
    }
  });

  onBeforeUnmount(() => {
    window.removeEventListener('click', handler);
  });
}
