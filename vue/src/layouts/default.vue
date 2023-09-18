<script setup lang="ts">
import { LayoutHeader, LayoutSider, LayoutTabs } from './components';

defineOptions({
  name: 'DefaultLayout',
});

// 保活
const cachedRouteStore = useCachedRoutesStore();
const include = computed(() => cachedRouteStore.cachedRoutes.map((route) => route.name));
</script>

<template>
  <n-layout class="h-screen" embedded>
    <layout-header height="4rem"></layout-header>
    <n-layout has-sider class="h-[calc(100vh-4rem)]" embedded>
      <layout-sider></layout-sider>
      <n-layout embedded>
        <layout-tabs></layout-tabs>
        <n-layout-content content-style="padding: 8px;" embedded>
          <n-h2>在这里放置默认布局的内容</n-h2>
          <router-view v-slot="{ Component, route }">
            <v-transition>
              <keep-alive :include="include">
                <component :is="Component" :key="route.fullPath" />
              </keep-alive>
            </v-transition>
          </router-view>
        </n-layout-content>
        <n-back-top></n-back-top>
      </n-layout>
    </n-layout>
  </n-layout>
</template>
