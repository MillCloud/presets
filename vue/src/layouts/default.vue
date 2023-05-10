<script setup lang="ts">
import { LayoutNetwork, LayoutVersion } from './components';
</script>

<template>
  <el-container class="relative h-screen">
    <el-main class="p-20">
      <router-view v-slot="{ Component, route }">
        <transition mode="out-in" name="el-fade-in" appear>
          <component :is="Component" :key="route.fullPath"></component>
        </transition>
      </router-view>
    </el-main>
    <el-footer class="flex items-center justify-center">
      <layout-network />
      <layout-version />
    </el-footer>
  </el-container>
</template>
