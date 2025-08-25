import { ref, onMounted, onBeforeUnmount } from 'vue';

export default function useScreenSize() {
  const width = ref(0);
  const height = ref(0);

  const isMobile = ref(false);
  const isTablet = ref(false);
  const isDesktop = ref(false);

  const update = () => {
    width.value = window.innerWidth;
    height.value = window.innerHeight;

    isMobile.value = width.value <= 768;
    isTablet.value = width.value > 768 && width.value <= 1024;
    isDesktop.value = width.value > 1024;
  };

  onMounted(() => {
    update();

    window.addEventListener('resize', update);
  });

  onBeforeUnmount(() => {
    window.removeEventListener('resize', update);
  });

  return {
    width,
    height,
    isMobile,
    isTablet,
    isDesktop,
  };
}
