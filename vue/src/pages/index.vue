<script setup lang="ts">
import { Icon } from '@iconify/vue';
</script>

<template>
  <n-row class="flex flex-col items-center justify-center">
    <n-row class="text-center">
      <span>@iconify/vue</span>
      <Icon icon="logos:vue"></Icon>
    </n-row>
    <n-row>
      <span>unplugin-icons</span>
      <i-logos-vue></i-logos-vue>
    </n-row>
    <n-row>
      <span>UnoCSS Icon</span>
      <div class="i-logos:vue"></div>
    </n-row>
    <div>index</div>
    <div class="mt-4">
      <n-button @click="$router.push('/sign-in')">SIGN IN</n-button>
    </div>
  </n-row>
</template>
