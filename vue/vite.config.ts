import { fileURLToPath } from 'node:url';
import { defineConfig, splitVendorChunkPlugin } from 'vite';
import { warmup } from 'vite-plugin-warmup';
import pages from 'vite-plugin-pages';
import layouts from 'vite-plugin-vue-layouts';
import autoImport from 'unplugin-auto-import/vite';
import vueComponents from 'unplugin-vue-components/vite';
import unocss from 'unocss/vite';
import IconsResolver from 'unplugin-icons/resolver';
import icons from 'unplugin-icons/vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import legacy from '@vitejs/plugin-legacy';
import compression from 'vite-plugin-compression2';
import inspect from 'vite-plugin-inspect';
import vueDevtools from 'vite-plugin-vue-devtools';
import { webUpdateNotice } from '@plugin-web-update-notification/vite';
import { dependencies } from './package.json';

export default defineConfig({
  build: {
    target: 'es6',
    cssTarget: 'chrome61',
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.startsWith('~icons/')) return 'icons';
          if (!id.includes('node_modules')) return;
          const array = id.split('node_modules/');
          const entry = array.at(-1) ?? '';
          if (!entry) return;
          const name = entry.startsWith('@')
            ? entry.split('/').slice(0, 2).join('/')
            : entry.split('/')[0];
          if (name === 'vue' || name.startsWith('@vue/')) return 'vue';
          if (name === 'vue-router') return 'vue-router';
          if (name === 'pinia' || name.startsWith('pinia-plugin')) return 'pinia';
          if (name === 'ant-design-vue' || name.startsWith('@ant-design/')) return 'ant-design';
          if (name === 'element-plus' || name.startsWith('@element-plus/')) return 'element-plus';
          if (name === 'naive-ui') return 'naive-ui';
          if (name.startsWith('@vicons/')) return 'vicons';
          if (name.startsWith('@ricons/')) return 'ricons';
          if (name.startsWith('@sicons/')) return 'sicons';
          if (name === 'xe-utils' || name.startsWith('vxe-table')) return 'vxe-table';
          if (name === 'echarts' || name === 'zrender') return 'echarts';
          if (name.startsWith('@wangeditor/')) return 'wangeditor';
          if (name.startsWith('@faker-js/')) return 'faker-js';
          if (name === 'lodash' || name === 'lodash-es') return 'lodash';
          if (name === 'axios') return 'axios';
          if (name === '@tanstack/vue-query') return 'vue-query';
          if (name === 'dayjs') return 'dayjs';
          if (name === 'qs') return 'qs';
          if (name.startsWith('@iconify/')) return 'iconify';
          return 'vendor';
        },
      },
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        charset: false,
        additionalData: `@use "@/styles/variables.scss" as *;`,
      },
    },
  },
  optimizeDeps: {
    include: Object.keys(dependencies),
    exclude: ['vue-demi'],
  },
  plugins: [
    splitVendorChunkPlugin(),
    warmup({
      clientFiles: ['./src/**/*.{js,jsx,ts,tsx,vue,json}'],
    }),
    pages({
      exclude: [
        '**/{components,composables,constants,directives,helpers,styles,types,utils}/**/*.{js,jsx,ts,tsx,vue}',
      ],
    }),
    layouts(),
    autoImport({
      imports: [
        'vue',
        'vue-router',
        'pinia',
        '@vueuse/core',
        {
          'naive-ui': ['useDialog', 'useMessage', 'useNotification', 'useLoadingBar'],
        },
      ],
    }),
    vueComponents({
      resolvers: [IconsResolver()],
      directoryAsNamespace: true,
      collapseSamePrefixes: true,
    }),
    unocss(),
    icons({
      compiler: 'vue3',
      defaultClass: 'n-icon',
    }),
    vue(),
    vueJsx(),
    legacy({
      targets: ['defaults', 'edge >= 79', 'firefox >= 67', 'safari >= 12', 'chrome >= 63'],
      polyfills: true,
      modernPolyfills: true,
    }),
    compression(),
    inspect(),
    vueDevtools(),
    webUpdateNotice({
      checkInterval: 60 * 60 * 1000, // 60m
      notificationProps: {
        title: '📢 更新通知',
        description: '版本已更新，请刷新页面。',
        buttonText: '刷新',
        dismissButtonText: '忽略',
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('src', import.meta.url)),
    },
  },
});
