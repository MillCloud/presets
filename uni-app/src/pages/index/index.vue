<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query';

const title = ref('Hello Vue & UniApp');

const id = ref(1);

const { data, isLoading } = useQuery<IUanResponseData, IUanRequestData>([
  computed(() => `/posts/${id.value}`),
]);

const isPrimaryButtonDisabled = ref(false);
const handleClickPrimaryButton = () => {
  isPrimaryButtonDisabled.value = !isPrimaryButtonDisabled.value;
};
</script>

<template>
  <view class="container items-center justify-center">
    <image class="m-4 mx-auto block h-20 w-20" src="/static/logo.png" />
    <view class="flex w-full items-center justify-center text-xl">
      <view class="i-logos-vue"></view>
      <text>{{ title }}</text>
    </view>
    <view class="flex w-full justify-between">
      <button
        class="m-4 flex h-8 flex-auto items-center justify-center rounded border border-solid border-gray-300 bg-gray-100 px-4 transition"
        hover-class="bg-primary border-primary text-white"
      >
        Click me
      </button>
      <button
        class="m-4 flex h-8 flex-auto items-center justify-center rounded border border-solid px-4 !text-white transition"
        :class="{
          'border-primary bg-primary': !isPrimaryButtonDisabled,
          '!border-primary-disabled !bg-primary-disabled': isPrimaryButtonDisabled,
        }"
        hover-class="bg-primary-darken-1 border-primary-darken-1"
        @click="handleClickPrimaryButton"
      >
        Click me
      </button>
    </view>
    <view class="flex w-full justify-center p-4">
      <template v-if="isLoading">Loading...</template>
      <template v-else>{{ data }}</template>
    </view>
  </view>
</template>
