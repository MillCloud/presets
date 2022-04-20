import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import vueDefineOptions from 'unplugin-vue-define-options/vite';
import pages from 'vite-plugin-pages';
import layouts from 'vite-plugin-vue-layouts';
import vueComponents from 'unplugin-vue-components/vite';
import iconsResolver from 'unplugin-icons/resolver';
import icons from 'unplugin-icons/vite';
import env from 'vite-plugin-env-compatible';
import eslint from '@modyqyw/vite-plugin-eslint';
import stylelint from 'vite-plugin-stylelint';
import compression from 'vite-plugin-compression';
// import mkcert from 'vite-plugin-mkcert';
import inspect from 'vite-plugin-inspect';

export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        charset: false,
        additionalData: `@use "@/styles/variables.scss" as *;`,
      },
    },
  },
  plugins: [
    vue({
      reactivityTransform: true,
    }),
    vueJsx(),
    vueDefineOptions(),
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
    vueComponents({
      resolvers: [iconsResolver()],
    }),
    icons({
      compiler: 'vue3',
      defaultClass: 'el-icon',
    }),
    env({
      prefix: 'VITE',
    }),
    eslint({
      fix: true,
    }),
    stylelint({
      fix: true,
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
  // server: {
  //   https: {
  //     // https://github.com/vitejs/vite/issues/4403
  //     // @ts-ignore
  //     maxSessionMemory: 128,
  //   },
  // },
});
