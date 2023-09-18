<script setup lang="ts">
definePage({
  name: 'Index',
  meta: {
    layout: 'simple',
  },
});
</script>

<template>
  <n-grid x-gap="8" y-gap="8" :cols="1" class="text-center">
    <n-gi>
      <n-h6>首页 Index</n-h6>
      <n-p>你可以在这里做屏幕检测、自动登录、外部登录后跳转等操作</n-p>
      <n-button @click="$router.push('/auth')">点击前往登录页面 SignIn</n-button>
    </n-gi>
  </n-grid>
</template>
