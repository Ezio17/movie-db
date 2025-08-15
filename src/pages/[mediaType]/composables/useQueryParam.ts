import { watch, type Ref } from 'vue';
import debounce from '@shared/utils/debounce';
import { useRoute, useRouter } from '#app';

function useQueryParam(key: string, defaultValue: Ref<string>, debounceTime = 0) {
  const route = useRoute();
  const router = useRouter();

  const updateQuery = debounce((value: string) => {
    const query = { ...route.query };

    if (value) {
      query[key] = value;
    } else {
      delete query[key];
    }

    router.replace({ query });
  }, debounceTime);

  watch(defaultValue, (value) => {
    updateQuery(value);
  });
}

export default useQueryParam;
