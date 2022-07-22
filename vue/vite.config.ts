import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import vueDefineOptions from 'unplugin-vue-define-options/vite';
import pages from 'vite-plugin-pages';
import layouts from 'vite-plugin-vue-layouts';
import autoImport from 'unplugin-auto-import/vite';
import vueComponents from 'unplugin-vue-components/vite';
import iconsResolver from 'unplugin-icons/resolver';
import icons from 'unplugin-icons/vite';
import env from 'vite-plugin-env-compatible';
import eslint from '@modyqyw/vite-plugin-eslint';
import stylelint from 'vite-plugin-stylelint';
import compression from 'vite-plugin-compression';
// import mkcert from 'vite-plugin-mkcert';
import inspect from 'vite-plugin-inspect';
import { dependencies } from './package.json';

export default defineConfig({
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
    autoImport({
      dirs: ['src/composables', 'src/composables/**', 'src/stores', 'src/stores/**'],
      imports: [
        'vue',
        'vue/macros',
        'vue-router',
        'pinia',
        '@vueuse/core',
        {
          'vue-query': [
            'QueryObserver',
            'QueriesObserver',
            'InfiniteQueryObserver',
            'MutationObserver',
            'hydrate',
            'dehydrate',
            'focusManager',
            'setLogger',
            'useQueryClient',
            'useQueryProvider',
            'VueQueryPlugin',
            'QueryClient',
            'QueryCache',
            'MutationCache',
            'useQuery',
            'useQueries',
            'useInfiniteQuery',
            'useMutation',
            'useIsFetching',
            'useIsMutating',
            'VUE_QUERY_CLIENT',
            'parseFilterArgs',
            'parseMutationArgs',
            'parseQueryArgs',
            'parseMutationFilterArgs',
          ],
        },
      ],
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
      defaultClass: 'el-icon',
    }),
    env({
      prefix: 'VITE',
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
});
