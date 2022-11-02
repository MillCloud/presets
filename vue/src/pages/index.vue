<template>
  <el-row class="flex flex-col items-center justify-center">
    <el-row>
      <v-icon icon="logos:vue"></v-icon>
    </el-row>
    <el-row>
      <i-logos-vue></i-logos-vue>
    </el-row>
    <el-row>
      <div class="i-logos:vue"></div>
    </el-row>
    <el-row>index</el-row>
    <el-row class="mt-4">
      <el-button @click="$router.push('/sign-in')">SIGN IN</el-button>
    </el-row>
  </el-row>
</template>
