<script setup lang="ts">
defineOptions({
  name: 'SimpleLayout',
});
</script>

<template>
  <n-layout class="h-screen" embedded>
    <n-layout-content content-style="padding: 8px" class="h-full">
      <n-h2 class="text-center">在这里放置简单布局的内容</n-h2>
      <router-view v-slot="{ Component, route }">
        <v-transition>
          <component :is="Component" :key="route.fullPath"></component>
        </v-transition>
      </router-view>
    </n-layout-content>
  </n-layout>
</template>
