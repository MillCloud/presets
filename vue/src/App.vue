<script setup lang="ts">
import zhCn from 'element-plus/lib/locale/lang/zh-cn';

const timer = ref(0);

/* 滚动条美化 */
window.addEventListener('scroll', () => {
  document.body.toggleAttribute('scroll', true);
  if (timer) {
    clearTimeout(timer.value);
  }
  timer.value = setTimeout(() => {
    document.body.toggleAttribute('scroll');
  }, 500) as unknown as number;
});
</script>

<template>
  <el-config-provider :locale="zhCn">
    <router-view />
  </el-config-provider>
</template>
