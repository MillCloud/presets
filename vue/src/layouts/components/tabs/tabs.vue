<script setup lang="ts">
defineOptions({
  name: 'LayoutTabs',
});

const router = useRouter();
const route = useRoute();

const cachedRoutesStore = useCachedRoutesStore();
const panels = computed(() => cachedRoutesStore.cachedRoutes);
const activePanel = computed({
  get: () => route.path,
  set: (path) => router.push(path),
});
const handleClose = (name: string) => {
  // 只剩一个
  if (panels.value.length === 1) {
    // 控制台页面 => 不关闭
    if (panels.value[0].path === '/dashboard') return;
    // 其它页面 => 关闭后打开控制台
    cachedRoutesStore.removeCachedRoutes();
    return router.push('/dashboard');
  }
  // 关闭的是当前页面，需要切换
  if (route.fullPath.startsWith(name)) {
    const index = panels.value.findIndex((panel) => panel.path === name);
    router.push(panels.value[index <= 0 ? index + 1 : index - 1].path);
  }
  // 移除对应的页面
  cachedRoutesStore.removeCachedRoute(name);
};
</script>

<template>
  <n-tabs v-model:value="activePanel" animated type="card" closable @close="handleClose">
    <n-tab-pane
      v-for="panel of panels"
      :key="panel.path"
      :name="panel.path"
      :tab="panel.title"
    ></n-tab-pane>
  </n-tabs>
</template>
