import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';
import vueMacros from 'unplugin-vue-macros/vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import legacy from '@vitejs/plugin-legacy';
import pages from 'vite-plugin-pages';
import layouts from 'vite-plugin-vue-layouts';
import autoImport from 'unplugin-auto-import/vite';
import vueComponents from 'unplugin-vue-components/vite';
import iconsResolver from 'unplugin-icons/resolver';
import icons from 'unplugin-icons/vite';
import eslint from '@modyqyw/vite-plugin-eslint';
import stylelint from 'vite-plugin-stylelint';
import compression from 'vite-plugin-compression';
// import mkcert from 'vite-plugin-mkcert';
import inspect from 'vite-plugin-inspect';
import progress from 'vite-plugin-progress';
import timeReporter from 'vite-plugin-time-reporter';
import { dependencies } from './package.json';

export default defineConfig({
  build: {
    commonjsOptions: {
      include: [],
    },
    target: 'es6',
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
    include: Object.keys(dependencies),
    exclude: ['vue-demi'],
  },
  plugins: [
    vueMacros({
      plugins: {
        vue: vue({ reactivityTransform: true }),
        vueJsx: vueJsx(),
      },
    }),
    legacy({
      targets: ['defaults', 'edge >= 79', 'firefox >= 67', 'safari >= 12', 'chrome >= 63'],
    }),
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
      dirs: ['src/composables', 'src/composables/**', 'src/stores', 'src/stores/**'],
      imports: ['vue', 'vue/macros', 'vue-router', 'pinia', '@vueuse/core'],
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
    eslint({
      fix: true,
      lintOnStart: true,
    }),
    stylelint({
      fix: true,
      lintOnStart: true,
    }),
    compression(),
    // mkcert({
    //   autoUpgrade: true,
    //   source: 'coding',
    // }),
    inspect(),
    progress(),
    timeReporter(),
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
    environment: 'jsdom',
  },
});
