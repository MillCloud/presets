<script setup lang="ts">
defineOptions({
  name: 'VBackButton',
});
</script>

<template>
  <el-button text type="primary" @click="$router.back()">
    <v-icon class="el-icon" icon="ant-design:left-outlined" />
    返回
  </el-button>
</template>
