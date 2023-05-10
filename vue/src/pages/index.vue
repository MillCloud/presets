<script setup lang="ts">
import { Icon } from '@iconify/vue';
</script>

<template>
  <el-row class="flex flex-col items-center justify-center">
    <el-row>
      <span>@iconify/vue</span>
      <Icon class="el-icon" icon="logos:vue"></Icon>
    </el-row>
    <el-row>
      <span>unplugin-icons</span>
      <i-logos-vue></i-logos-vue>
    </el-row>
    <el-row>
      <span>UnoCSS Icon</span>
      <div class="el-icon i-logos:vue"></div>
    </el-row>
    <el-row>index</el-row>
    <el-row class="mt-4">
      <el-button @click="$router.push('/sign-in')">SIGN IN</el-button>
    </el-row>
  </el-row>
</template>
