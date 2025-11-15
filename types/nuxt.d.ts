/// <reference types="vue" />
/// <reference types="vue-router" />

interface NuxtError {
  statusCode?: number;
  message?: string;
  [key: string]: unknown;
}

interface PageMeta {
  validate?: (
    route: import('vue-router').RouteLocationNormalized
  ) => boolean | Promise<boolean> | Partial<NuxtError> | Promise<Partial<NuxtError>>;
  redirect?: string | { name: string } | { path: string };
  name?: string;
  path?: string;
  props?: Record<string, unknown>;
  alias?: string | string[];
  pageTransition?: boolean | import('vue').TransitionProps;
  layoutTransition?: boolean | import('vue').TransitionProps;
  viewTransition?: boolean | 'always';
  key?: false | string | ((route: import('vue-router').RouteLocationNormalizedLoaded) => string);
  keepalive?: boolean | { max?: number; include?: string | string[]; exclude?: string | string[] };
  layout?: false | string | import('vue').Ref<string> | import('vue').ComputedRef<string>;
  middleware?:
    | string
    | ((
        to: import('vue-router').RouteLocationNormalizedLoaded,
        from: import('vue-router').RouteLocationNormalizedLoaded
      ) => boolean | Promise<boolean>)
    | Array<
        | string
        | ((
            to: import('vue-router').RouteLocationNormalizedLoaded,
            from: import('vue-router').RouteLocationNormalizedLoaded
          ) => boolean | Promise<boolean>)
      >;
  scrollToTop?:
    | boolean
    | ((
        to: import('vue-router').RouteLocationNormalizedLoaded,
        from: import('vue-router').RouteLocationNormalizedLoaded
      ) => boolean);
  [key: string]: unknown;
}

declare function definePageMeta(meta: PageMeta): void;
