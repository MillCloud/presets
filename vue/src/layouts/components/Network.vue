<template>
  <div
    v-if="network.isSupported"
    class="flex h-8 items-center justify-center"
    :class="networkClass"
  >
    <v-icon icon="carbon:network-public" class="el-icon mx-2" />
    <span class="mr-2">
      {{ networkText }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { useNetwork } from '@vueuse/core';
import { reactive, computed } from 'vue';

const network = reactive(useNetwork());
const networkText = computed(() => {
  if (!network.isSupported) {
    return '';
  }
  if (!network.isOnline) {
    return '网络异常，请检查';
  }
  if (network.effectiveType !== '4g') {
    return '网络慢，请检查';
  }
  return '网络正常';
});
const networkClass = computed(() => {
  if (!network.isSupported) {
    return '';
  }
  if (!network.isOnline) {
    return 'text-danger';
  }
  if (network.effectiveType !== '4g') {
    return 'text-warning';
  }
  return '';
});
</script>
