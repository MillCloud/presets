<script setup lang="ts">
defineOptions({
  name: 'LayoutNetwork',
});

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

<template>
  <div
    v-if="network.isSupported"
    class="h-8 flex items-center justify-center"
    :class="networkClass"
  >
    <i-carbon-network-public class="mx-2"></i-carbon-network-public>
    <span class="mr-2">
      {{ networkText }}
    </span>
  </div>
</template>
