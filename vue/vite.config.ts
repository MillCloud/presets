import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';
import pages from 'vite-plugin-pages';
import layouts from 'vite-plugin-vue-layouts';
import unpluginVueDefineOptions from 'unplugin-vue-define-options';
import autoImport from 'unplugin-auto-import/vite';
import vueComponents from 'unplugin-vue-components/vite';
import iconsResolver from 'unplugin-icons/resolver';
import icons from 'unplugin-icons/vite';
import unocss from 'unocss/vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import legacy from '@vitejs/plugin-legacy';
import eslint from 'vite-plugin-eslint2';
import stylelint from 'vite-plugin-stylelint';
import compression from 'vite-plugin-compression2';
import inspect from 'vite-plugin-inspect';

export default defineConfig({
  build: {
    commonjsOptions: {
      include: [],
    },
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
    disabled: false,
    exclude: ['vue-demi'],
  },
  plugins: [
    pages({
      exclude: [
        '**/components/*.js',
        '**/components/*.jsx',
        '**/components/*.ts',
        '**/components/*.tsx',
        '**/components/*.vue',
      ],
    }),
    layouts(),
    autoImport({
      dirs: [
        'src/composables',
        'src/composables/**',
        'src/helpers',
        'src/helpers/**',
        'src/stores',
        'src/stores/**',
        'src/utils',
        'src/utils/**',
      ],
      imports: ['vue', 'vue-router', 'pinia', '@vueuse/core'],
    }),
    vueComponents({
      dirs: ['src/components'],
      resolvers: [
        {
          type: 'component',
          resolve: (componentName) => {
            if (componentName === 'VIcon') {
              return { name: 'Icon', from: '@iconify/vue' };
            }
          },
        },
        iconsResolver(),
      ],
    }),
    icons({
      compiler: 'vue3',
      defaultClass: 'el-icon el-icon-',
    }),
    unocss(),
    unpluginVueDefineOptions.vite(),
    vue(),
    vueJsx(),
    legacy({
      targets: ['defaults', 'edge >= 79', 'firefox >= 67', 'safari >= 12', 'chrome >= 63'],
      polyfills: true,
      modernPolyfills: true,
    }),
    eslint({
      fix: true,
      lintOnStart: true,
    }),
    stylelint({
      fix: true,
      lintOnStart: true,
    }),
    compression(),
    inspect(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('src', import.meta.url)),
    },
  },
  test: {
    coverage: {
      provider: 'c8',
      reporter: ['text', 'json', 'html'],
    },
    environment: 'happy-dom',
  },
});
