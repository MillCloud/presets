<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { LogoVue } from '@vicons/ionicons5';

defineOptions({
  name: 'ExamplesIcon',
});
definePage({
  name: 'ExamplesIcon',
  meta: {
    title: '图标',
    sort: 1,
  },
});
</script>

<template>
  <n-grid x-gap="8" y-gap="8" cols="1 m:2 xxl:4" responsive="screen" class="text-center">
    <n-gi span="1 m:2 xxl:4">
      <n-h6>有那么多种图标使用方式</n-h6>
    </n-gi>
    <n-gi>
      <n-h6>@iconify/vue</n-h6>
      <Icon class="n-icon" icon="logos:vue"></Icon>
    </n-gi>
    <n-gi>
      <n-h6>unplugin-icons</n-h6>
      <i-logos-vue></i-logos-vue>
    </n-gi>
    <n-gi>
      <n-h6>UnoCSS Icon</n-h6>
      <div class="n-icon i-logos:vue"></div>
    </n-gi>
    <n-gi>
      <n-h6>NaiveUI Icon</n-h6>
      <n-icon>
        <LogoVue />
      </n-icon>
    </n-gi>
  </n-grid>
</template>
