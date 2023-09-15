<script setup lang="ts">
defineOptions({
  name: 'DefaultLayout',
});

const isSiderCollapsed = useStorage('isSiderCollapsed', false);
const handleSiderUpdateCollapsed = (collapsed: boolean) => {
  isSiderCollapsed.value = collapsed;
};
</script>

<template>
  <n-layout class="h-screen" embedded>
    <n-layout-header bordered class="h-16 flex flex-none items-center p-2">
      header
    </n-layout-header>
    <n-layout has-sider class="h-[calc(100vh-4rem)]" embedded>
      <n-layout-sider
        collapse-mode="width"
        :width="256"
        :collapsed-width="64"
        content-style="padding: 8px;"
        bordered
        show-trigger
        :collapsed="isSiderCollapsed"
        @update:collapsed="handleSiderUpdateCollapsed"
      >
        <p>sider</p>
      </n-layout-sider>
      <n-layout-content content-style="padding: 8px;" embedded>
        <p>content</p>
        <n-back-top></n-back-top>
      </n-layout-content>
    </n-layout>
  </n-layout>
</template>
