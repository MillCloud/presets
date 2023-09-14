<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query';
import { useTheme } from '@/composables';

const title = ref('Hello Vue & UniApp');

const id = ref(1);

const { data, isLoading } = useQuery<IUnResponseData, IUnRequestData>({
  queryKey: [computed(() => `/posts/${id.value}`)],
});

const { theme, parsedTheme, toggleTheme } = useTheme();
</script>

<template>
  <view class="items-center justify-center">
    <image class="m-4 mx-auto block h-20 w-20" src="/static/logo.png" />
    <view class="w-full flex items-center justify-center text-xl">
      <view class="i-logos-vue"></view>
      <text>{{ title }}</text>
    </view>
    <nut-cell>
      <nut-button type="primary" class="mx-auto" @click="toggleTheme">
        Theme: {{ theme }}, ParsedTheme: {{ parsedTheme }}
      </nut-button>
    </nut-cell>
    <view class="w-full flex justify-center p-4">
      <template v-if="isLoading">Loading...</template>
      <template v-else>{{ data }}</template>
    </view>
  </view>
</template>
