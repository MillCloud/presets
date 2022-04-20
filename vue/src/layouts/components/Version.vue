<template>
  <div class="flex h-8 items-center justify-center">
    <v-icon icon="carbon:version" class="el-icon mx-2" />
    <span class="mr-2">v{{ pkg.version }}</span>
  </div>
</template>

<script setup lang="ts">
import pkg from '@/../package.json';
</script>
