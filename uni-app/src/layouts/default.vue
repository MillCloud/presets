<script setup lang="ts">
import { useTheme } from '@/composables';

const { parsedTheme } = useTheme();
</script>

<template>
  <nut-config-provider :theme="parsedTheme">
    <slot></slot>
  </nut-config-provider>
</template>
