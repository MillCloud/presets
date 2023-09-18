<script setup lang="tsx">
import type { MenuOption, MenuInst } from 'naive-ui';
import { Icon } from '@iconify/vue';
import type { RouteRecordRaw } from 'vue-router/auto';
import { patchedRoutes } from '@/router';

defineOptions({
  name: 'LayoutSider',
});

// 折叠
const isSiderCollapsed = useStorage('isSiderCollapsed', false);

// 菜单
const getMenuItemKey = (route: RouteRecordRaw) => route.path;
const getMenuItemLabel = (route: RouteRecordRaw) => () =>
  route.children?.length ? (
    <n-ellipsis>{route.meta?.title ?? route.name ?? ''}</n-ellipsis>
  ) : (
    <n-ellipsis>
      <router-link to={route.path}>{route.meta?.title ?? route.name ?? ''}</router-link>
    </n-ellipsis>
  );
const getMenuItemIcon = (route: RouteRecordRaw) => () =>
  route.meta?.icon ? <Icon class="n-icon" icon={(route.meta?.icon ?? '') as string}></Icon> : null;
const getMenuItem = (route: RouteRecordRaw): MenuOption => {
  return {
    key: getMenuItemKey(route),
    label: getMenuItemLabel(route),
    icon: getMenuItemIcon(route),
    children: route.children?.map((child) => getMenuItem(child)),
  };
};
const menuOptions = computed<MenuOption[]>(() => patchedRoutes.map((route) => getMenuItem(route)));
watchEffect(() => {
  console.log('');
  console.log('🚀 ~ file: sider.vue:35 ~ menuOptions:', menuOptions.value);
});
const route = useRoute();
const menuRef = ref<MenuInst>();
const menuValue = computed(() => route.path);
watch(
  menuValue,
  () => {
    if (!menuRef.value) return;
    menuRef.value.showOption(menuValue.value);
  },
  { immediate: true },
);
</script>

<template>
  <n-layout-sider
    v-model:collapsed="isSiderCollapsed"
    collapse-mode="width"
    :width="256"
    :collapsed-width="64"
    content-style="padding: 8px;"
    bordered
    show-trigger
  >
    <n-menu
      ref="menuRef"
      :collapsed="isSiderCollapsed"
      :collapsed-width="64"
      :options="menuOptions"
      :value="menuValue"
    ></n-menu>
  </n-layout-sider>
</template>
