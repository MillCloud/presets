<script setup lang="ts">
import { useCachedRoutesStore } from '@/stores';

defineOptions({
  name: 'SimpleLayout',
});

const cachedRouteStore = useCachedRoutesStore();
const include = computed(() => cachedRouteStore.cachedRoutes.flatMap((route) => [route.name]));
</script>

<template>
  <n-layout class="h-screen" embedded>
    <n-layout-content content-style="padding: 8px">
      <p>simple layout content</p>
      <router-view v-slot="{ Component, route }">
        <transition name="el-fade-in" mode="out-in" appear>
          <keep-alive :include="include">
            <component :is="Component" :key="route.fullPath" />
          </keep-alive>
        </transition>
      </router-view>
    </n-layout-content>
  </n-layout>
</template>
