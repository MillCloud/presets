<script setup lang="ts">
import { LayoutNetwork, LayoutVersion } from './components';
</script>

<template>
  <n-layout class="relative h-screen">
    <div class="h-full flex flex-col">
      <n-layout-content class="flex items-center justify-center p-20 text-center">
        <router-view v-slot="{ Component, route }">
          <transition mode="out-in" name="fade" appear>
            <component :is="Component" :key="route.fullPath"></component>
          </transition>
        </router-view>
      </n-layout-content>
      <n-layout-footer class="flex items-center justify-center bg-white">
        <layout-network />
        <layout-version />
      </n-layout-footer>
    </div>
  </n-layout>
</template>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
