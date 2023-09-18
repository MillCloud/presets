<script setup lang="ts">
defineOptions({
  name: 'Dashboard',
});
definePage({
  name: 'Dashboard',
  meta: {
    title: '控制台',
    icon: 'ant-design:dashboard-outlined',
  },
});
</script>

<template>
  <n-grid x-gap="8" y-gap="8" cols="1 m:2 xl:4" responsive="screen">
    <n-gi>
      <n-card title="这里可以放点什么"></n-card>
    </n-gi>
    <n-gi>
      <n-card title="但我没有头绪"></n-card>
    </n-gi>
    <n-gi>
      <n-card title="至少放点什么吧"></n-card>
    </n-gi>
    <n-gi>
      <n-card title="不然心里空空落落"></n-card>
    </n-gi>
  </n-grid>
</template>
