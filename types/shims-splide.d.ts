declare module '@splidejs/vue-splide' {
  import { DefineComponent } from 'vue';

  export interface SplideProps {
    options?: {
      type?: 'loop' | 'slide' | 'fade';
      perPage?: number;
      perMove?: number;
      gap?: string | number;
      autoplay?: boolean;
      interval?: number;
      pauseOnHover?: boolean;
      pauseOnFocus?: boolean;
      resetProgress?: boolean;
      arrows?: boolean;
      pagination?: boolean;
      drag?: boolean;
      keyboard?: boolean;
      wheel?: boolean;
      releaseWheel?: boolean;
      trimSpace?: boolean;
      focus?: boolean | string | number;
      isNavigation?: boolean;
      flickMaxPages?: number;
      direction?: 'ltr' | 'rtl' | 'ttb';
      cover?: boolean;
      slideFocus?: boolean;
      updateOnMove?: boolean;
      throttle?: number;
      destroy?: boolean;
      breakpoints?: Record<string, Partial<SplideProps['options']>>;
    };
    extensions?: Record<string, unknown>;
    transition?: string;
    hasTrack?: boolean;
    tag?: string;
    id?: string;
    class?: string;
  }

  export interface SplideSlideProps {
    tag?: string;
    id?: string;
    class?: string;
  }

  export const Splide: DefineComponent<SplideProps>;
  export const SplideSlide: DefineComponent<SplideSlideProps>;
}
