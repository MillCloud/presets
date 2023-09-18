<script setup lang="tsx">
import screenfull from 'screenfull';
import { Icon } from '@iconify/vue';
import {
  SearchOutlined,
  FullscreenOutlined,
  FullscreenExitOutlined,
  DesktopOutlined,
  UserOutlined,
  LogoutOutlined,
} from '@vicons/antd';
import { Sun, Moon } from '@vicons/carbon';
import { isString } from '@modyqyw/utils';
import { type DropdownOption } from 'naive-ui';
import type { RouteRecordRaw } from 'vue-router/auto';
import { patchedRoutes } from '@/router';

defineOptions({
  name: 'LayoutHeader',
});

const props = defineProps<{
  height: number | string;
}>();
const parsedHeight = computed(() => {
  if (isString(props.height)) return props.height;
  return props.height + 'px';
});

const authStore = useAuthStore();
const router = useRouter();
const currentRoute = useRoute();

// 面包屑
const getBreadcrumbs = (
  routes?: RouteRecordRaw[],
  result: RouteRecordRaw[] = [],
): RouteRecordRaw[] => {
  if (!routes) return result;
  const route = routes.find((route) => currentRoute.fullPath.startsWith(route.path));
  if (!route) return result;
  result.push(route);
  if (route.children) return getBreadcrumbs(route.children, result);
  return result;
};
const breadcrumbs = computed(() => getBreadcrumbs(patchedRoutes));
watchEffect(() => {
  console.log('');
  console.log('🚀 ~ file: header.vue:49 ~ watchEffect ~ breadcrumbs:', breadcrumbs.value);
});

// 搜索
const flattenRoute = (route: RouteRecordRaw): RouteRecordRaw[] => {
  if (!route.children) return [route];
  return [route, ...route.children!.flatMap((child) => flattenRoute(child))];
};
const pages = computed(() => patchedRoutes.flatMap((route) => flattenRoute(route)));
watchEffect(() => {
  console.log('');
  console.log('🚀 ~ file: header.vue:60 ~ watchEffect ~ pages:', pages.value);
});
const showSearchModal = ref(false);
const handleToggleShowSearchModal = () => {
  showSearchModal.value = !showSearchModal.value;
};
const searchValue = ref('');
watchEffect(() => {
  if (!showSearchModal.value) searchValue.value = '';
});
const showSearchResults = computed(() => !!searchValue.value);
const filteredPages = computed(() =>
  pages.value.filter(
    (page) =>
      parseRouteName(page.name).includes(searchValue.value) ||
      page.path.includes(searchValue.value) ||
      (page.meta?.title as string | undefined)?.includes(searchValue.value),
  ),
);
const handleClickPage = (page: RouteRecordRaw) => {
  router.push(page.path);
  handleToggleShowSearchModal();
};

// 全屏
const isScreenFull = ref(false);
const handleToggleScreenFull = () => {
  isScreenFull.value = !isScreenFull.value;
  screenfull.toggle(undefined, { navigationUI: 'hide' });
};
const screenFullText = computed(() => (isScreenFull.value ? '退出全屏' : '全屏'));
const screenFullIcon = computed(() =>
  isScreenFull.value ? FullscreenExitOutlined : FullscreenOutlined,
);

// 主题
const { theme, toggleTheme } = useTheme();
const themeText = computed(() => {
  const base = '主题：';
  if (theme.value === 'light') return base + '浅色';
  if (theme.value === 'dark') return base + '深色';
  return base + '自动';
});
const themeIcon = computed(() => {
  if (theme.value === 'light') return Sun;
  if (theme.value === 'dark') return Moon;
  return DesktopOutlined;
});

// 用户
const dialog = useDialog();
const dropdownOptions: DropdownOption[] = [
  {
    label: '退出登录',
    key: 'logout',
    icon: () => (
      <n-icon>
        <LogoutOutlined />
      </n-icon>
    ),
  },
];
const handleSelectDropdownItem = (key: string | number) => {
  const stringKey = String(key);
  if (stringKey === 'logout') {
    dialog.warning({
      title: '提示',
      content: '确认退出登录？',
      positiveText: '确定',
      negativeText: '取消',
      onPositiveClick: () => {
        authStore.setToken();
        authStore.setIsTokenFresh();
        authStore.setUserInfo();
        router.push('/');
      },
    });
  }
};
</script>

<template>
  <n-layout-header bordered class="h-16 flex items-center" :style="{ height: parsedHeight }">
    <div class="h-full w-256px flex items-center px-2">
      <n-image
        width="32"
        src="https://www.naiveui.com/assets/naivelogo-93278402.svg"
        preview-disabled
      ></n-image>
      <h6 class="ml-2 text-lg font-medium">Title</h6>
    </div>
    <div class="h-full flex items-center px-2">
      <n-breadcrumb>
        <n-breadcrumb-item
          v-for="breadcrumb of breadcrumbs"
          :key="breadcrumb.path"
          :href="breadcrumb.path"
        >
          <Icon
            v-if="breadcrumb.meta?.icon"
            class="n-icon"
            :icon="(breadcrumb.meta?.icon as string)"
          ></Icon>
          {{ breadcrumb.meta?.title ?? breadcrumb.name ?? '' }}
        </n-breadcrumb-item>
      </n-breadcrumb>
    </div>
    <v-spacer></v-spacer>
    <div class="h-full flex items-center px-2">
      <!-- 搜索模态框 -->
      <!-- 如果放到 n-tooltip 内会造成样式问题 -->
      <n-modal
        v-model:show="showSearchModal"
        preset="card"
        :bordered="false"
        title="搜索页面"
        class="min-w-320px w-4/5"
      >
        <n-input v-model:value="searchValue" placeholder="输入关键字搜索页面" clearable>
          <template #prefix>
            <n-icon><search-outlined></search-outlined></n-icon>
          </template>
        </n-input>
        <n-list v-if="showSearchResults" hoverable clickable class="mt-4">
          <n-list-item
            v-for="page of filteredPages"
            :key="page.path"
            @click="handleClickPage(page)"
          >
            <n-thing>
              <Icon class="n-icon mx-2" :icon="((page.meta?.icon ?? '') as string)"></Icon>
              {{ page.meta?.title ?? page.name ?? '' }}
            </n-thing>
          </n-list-item>
        </n-list>
      </n-modal>
      <n-space>
        <!-- 搜索 -->
        <n-tooltip>
          搜索页面
          <template #trigger>
            <n-button quaternary circle @click="handleToggleShowSearchModal">
              <template #icon>
                <n-icon>
                  <search-outlined></search-outlined>
                </n-icon>
              </template>
            </n-button>
          </template>
        </n-tooltip>
        <!-- 全屏 -->
        <n-tooltip>
          {{ screenFullText }}
          <template #trigger>
            <n-button quaternary circle @click="handleToggleScreenFull">
              <template #icon>
                <n-icon>
                  <v-transition>
                    <component :is="screenFullIcon"></component>
                  </v-transition>
                </n-icon>
              </template>
            </n-button>
          </template>
        </n-tooltip>
        <!-- 主题 -->
        <n-tooltip>
          {{ themeText }}
          <template #trigger>
            <n-button quaternary circle @click="toggleTheme">
              <template #icon>
                <n-icon>
                  <v-transition>
                    <component :is="themeIcon"></component>
                  </v-transition>
                </n-icon>
              </template>
            </n-button>
          </template>
        </n-tooltip>
        <!-- 用户 -->
        <n-dropdown :options="dropdownOptions" @select="handleSelectDropdownItem">
          <n-button circle quaternary>
            <template #icon>
              <n-icon>
                <user-outlined></user-outlined>
              </n-icon>
            </template>
          </n-button>
        </n-dropdown>
      </n-space>
    </div>
  </n-layout-header>
</template>
