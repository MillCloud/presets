<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { LogoVue } from '@vicons/ionicons5';
</script>

<template>
  <n-grid x-gap="16" y-gap="16" cols="1">
    <n-gi>
      <p>@iconify/vue</p>
      <Icon class="n-icon" icon="logos:vue"></Icon>
    </n-gi>
    <n-gi>
      <p>unplugin-icons</p>
      <i-logos-vue></i-logos-vue>
    </n-gi>
    <n-gi>
      <p>UnoCSS Icon</p>
      <div class="n-icon i-logos:vue"></div>
    </n-gi>
    <n-gi>
      <p>NaiveUi Icon</p>
      <n-icon>
        <LogoVue />
      </n-icon>
    </n-gi>
    <n-gi>
      <p>index</p>
      <n-button @click="$router.push('/sign-in')">SIGN IN</n-button>
    </n-gi>
  </n-grid>
</template>
