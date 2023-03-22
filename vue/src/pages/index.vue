<template>
  <el-row class="flex flex-col items-center justify-center">
    <el-row>
      <span>Iconify</span>
      <v-icon icon="logos:vue"></v-icon>
    </el-row>
    <el-row>
      <span>unplugin-icons</span>
      <i-logos-vue></i-logos-vue>
    </el-row>
    <el-row>
      <span>TailwindCSS Icon</span>
      <div class="i-logos-vue"></div>
    </el-row>
    <el-row>index</el-row>
    <el-row class="mt-4">
      <el-button @click="$router.push('/sign-in')">SIGN IN</el-button>
    </el-row>
  </el-row>
</template>
