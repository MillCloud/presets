import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';
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
    pages({
      exclude: [
        '**/{components,composables,constants,directives,helpers,styles,types,utils}/**/*.{js,jsx,ts,tsx,vue}',
      ],
    }),
    layouts(),
    autoImport({
      imports: ['vue', 'vue-router', 'pinia', '@vueuse/core'],
    }),
    vueComponents({
      dirs: ['src/components'],
      resolvers: [IconsResolver()],
    }),
    unocss(),
    icons({
      compiler: 'vue3',
      defaultClass: 'el-icon',
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
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('src', import.meta.url)),
    },
  },
});
