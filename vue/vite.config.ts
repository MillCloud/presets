import path from 'node:path';
// import { fileURLToPath } from 'url';
import eslint from '@modyqyw/vite-plugin-eslint';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import iconsResolver from 'unplugin-icons/resolver';
import icons from 'unplugin-icons/vite';
import vueComponents from 'unplugin-vue-components/vite';
import vueDefineOptions from 'unplugin-vue-define-options/vite';
import { defineConfig } from 'vite';
import compression from 'vite-plugin-compression';
import env from 'vite-plugin-env-compatible';
import pages from 'vite-plugin-pages';
import stylelint from 'vite-plugin-stylelint';
import layouts from 'vite-plugin-vue-layouts';
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
      // '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@/': `${path.resolve('src')}/`,
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
