import type { Ref } from 'vue';
import { watch, onBeforeUnmount } from 'vue';

export default function useClickOutside(
  targetRef: Ref<HTMLElement | null>,
  isOpen: Ref<boolean>,
  callback: () => void,
  ignoreFirstClick: boolean = false
) {
  let shouldIgnoreNext = false;

  function handler(event: MouseEvent) {
    if (!isOpen.value) return;

    if (shouldIgnoreNext) {
      shouldIgnoreNext = false;

      return;
    }

    if (targetRef.value && !targetRef.value.contains(event.target as Node)) {
      callback();
    }
  }

  watch(isOpen, (open) => {
    if (open) {
      shouldIgnoreNext = ignoreFirstClick;

      window.addEventListener('click', handler);
    } else {
      window.removeEventListener('click', handler);
    }
  });

  onBeforeUnmount(() => {
    window.removeEventListener('click', handler);
  });
}
