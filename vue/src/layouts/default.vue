<template>
  <el-container class="relative h-screen">
    <el-main class="p-20">
      <v-router-view />
    </el-main>
    <el-footer class="flex items-center justify-center">
      <layout-network />
      <layout-version />
      <layout-theme />
    </el-footer>
  </el-container>
</template>

<script setup lang="ts">
import { LayoutNetwork, LayoutVersion, LayoutTheme } from './components';
</script>
