<script setup lang="ts">
import pkg from '@/../package.json';
</script>

<template>
  <div class="flex h-8 items-center justify-center">
    <i-carbon-version class="mx-2"></i-carbon-version>
    <span class="mr-2">v{{ pkg.version }}</span>
  </div>
</template>
