<script setup lang="ts">
import { LayoutNetwork, LayoutVersion } from './components';
</script>

<template>
  <!-- 滚动条美化需要在布局设置背景色 -->
  <el-container class="relative h-screen bg-white">
    <el-main class="p-20">
      <v-router-view />
    </el-main>
    <el-footer class="flex items-center justify-center">
      <layout-network />
      <layout-version />
    </el-footer>
  </el-container>
</template>
