<template>
  <div v-if="info" class="flex flex-col sm:flex-row gap-6 p-4 bg-slate-50 rounded-lg shadow-md">
    <img
      v-if="info.profile_path"
      :src="generateImgPath('w342', info.profile_path)"
      alt="Photo"
      class="w-[342px] h-[440px] rounded-md object-contain self-center md:self-auto"
    />
    <div class="flex flex-col gap-3 text-xl">
      <template v-for="{ label, value } of personFields">
        <p v-if="value" :key="label" class="text-gray-700">
          <span class="font-semibold text-gray-900">{{ label }}: </span>
          <span class="break-words">{{ value }}</span>
        </p>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { navigateTo } from '#app';
import { generateImgPath } from '@/shared/utils';
import { usePersonInfo } from './api';

interface Props {
  id: string;
}

const props = defineProps<Props>();
const { t } = useI18n();

const { data: info } = await usePersonInfo(props.id);

if (!info.value) {
  navigateTo('/');
}

const personFields = computed(() => [
  {
    label: t('name'),
    value: info.value!.name,
  },
  {
    label: t('also_known_as'),
    value: info.value!.also_known_as!.join(', '),
  },
  {
    label: t('birthday'),
    value: info.value!.birthday,
  },
  {
    label: t('deathday'),
    value: info.value!.deathday,
  },
  {
    label: t('place_of_birth'),
    value: info.value!.place_of_birth,
  },
  {
    label: t('biography'),
    value: info.value!.biography,
  },
]);
</script>
