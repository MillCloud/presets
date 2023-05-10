<script setup lang="ts">
import pkg from '@/../package.json';

defineOptions({
  name: 'LayoutVersion',
});
</script>

<template>
  <div class="h-8 flex items-center justify-center">
    <i-carbon-version class="mx-2"></i-carbon-version>
    <span class="mr-2">v{{ pkg.version }}</span>
  </div>
</template>
