<template>
  <view class="container items-center justify-center">
    <image class="m-4 mx-auto block h-20 w-20" src="/static/logo.png" />
    <view class="flex w-full justify-center">
      <text class="text-xl">{{ title }}</text>
    </view>
    <view class="flex w-full justify-between">
      <button
        class="m-4 flex h-8 flex-auto items-center justify-center rounded border border-solid border-gray-300 bg-gray-100 px-4 transition"
        hover-class="bg-primary border-primary text-white"
      >
        default
      </button>
      <button
        class="m-4 flex h-8 flex-auto items-center justify-center rounded border border-solid border-primary bg-primary px-4 text-white transition"
        hover-class="bg-primary-darken-1 border-primary-darken-1"
      >
        primary
      </button>
    </view>
    <view class="flex w-full justify-center">
      <tui-button class="m-4 w-full">thor-ui</tui-button>
    </view>
    <view class="flex w-full justify-center p-4">
      <template v-if="isLoading">Loading...</template>
      <template v-else>{{ data }}</template>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useQuery } from 'vue-query';

const title = ref('Hello UniApp');

const id = ref(1);

const { data, isLoading } = useQuery<IResponseData, IResponseError>([id]);
</script>
