import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';
import pages from 'vite-plugin-pages';
import layouts from 'vite-plugin-vue-layouts';
import vueMacros from 'unplugin-vue-macros/vite';
import autoImport from 'unplugin-auto-import/vite';
import vueComponents from 'unplugin-vue-components/vite';
import iconsResolver from 'unplugin-icons/resolver';
import icons from 'unplugin-icons/vite';
import unocss from 'unocss/vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import legacy from '@vitejs/plugin-legacy';
import eslint from '@modyqyw/vite-plugin-eslint';
import stylelint from 'vite-plugin-stylelint';
import compression from 'vite-plugin-compression';
// import mkcert from 'vite-plugin-mkcert';
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
    unocss(),
    vueMacros({
      plugins: {
        vue: vue({ reactivityTransform: true }),
        vueJsx: vueJsx(),
      },
    }),
    legacy({
      targets: ['defaults', 'edge >= 79', 'firefox >= 67', 'safari >= 12', 'chrome >= 63'],
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
