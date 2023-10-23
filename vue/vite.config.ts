import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import { warmup } from 'vite-plugin-warmup';
import vueRouter from 'unplugin-vue-router/vite';
import { VueRouterAutoImports, getPascalCaseRouteName } from 'unplugin-vue-router';
import layouts from 'vite-plugin-vue-meta-layouts';
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
    warmup({
      clientFiles: ['./src/**/*.{js,jsx,ts,tsx,vue,json}'],
    }),
    vueRouter({
      exclude: [
        'components',
        'composables',
        'constants',
        'directives',
        'helpers',
        'styles',
        'types',
        'utils',
      ].map((item) => `**/${item}/**/*.{js,jsx,ts,tsx,vue}`),
      getRouteName: getPascalCaseRouteName,
    }),
    layouts(),
    autoImport({
      dirs: ['helpers', 'composables', 'constants', 'helpers', 'stores', 'utils'].map(
        (item) => `src/${item}/**`,
      ),
      imports: [
        'vue',
        VueRouterAutoImports,
        'pinia',
        '@vueuse/core',
        {
          'naive-ui': ['useDialog', 'useMessage', 'useNotification', 'useLoadingBar'],
        },
      ],
      vueTemplate: true,
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
