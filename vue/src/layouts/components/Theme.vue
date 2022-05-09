<template>
  <el-switch
    :value="isDark"
    inline-prompt
    :active-icon="Moon"
    active-color="#2c2c2c"
    :inactive-icon="Sunny"
    inactive-color="#409eff"
    @change="toggleDark()"
  ></el-switch>
</template>

<script setup lang="ts">
import { Sunny, Moon } from '@element-plus/icons-vue';
import { useDark, useToggle } from '@vueuse/core';
import { ThemeKey } from '@/constants';

defineOptions({
  name: 'LayoutTheme',
});

const isDark = useDark({
  storageKey: ThemeKey,
});
const toggleDark = useToggle(isDark);
</script>
