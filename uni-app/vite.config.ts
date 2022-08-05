import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';
import uni from '@dcloudio/vite-plugin-uni';
import vueMarcos from 'unplugin-vue-macros/vite';
import tailwindcss from 'tailwindcss';
// @ts-ignore
import postcssPresetEnv from 'postcss-preset-env';
import autoImport from 'unplugin-auto-import/vite';
import vueComponents from 'unplugin-vue-components/vite';
import iconsResolver from 'unplugin-icons/resolver';
import icons from 'unplugin-icons/vite';
import eslint from '@modyqyw/vite-plugin-eslint';
import stylelint from 'vite-plugin-stylelint';
import inspect from 'vite-plugin-inspect';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    target: 'es2015',
  },
  css: {
    // FIX: not support postcss config file yet
    postcss: {
      plugins: [
        tailwindcss(),
        postcssPresetEnv({
          stage: 3,
        }),
      ],
    },
    preprocessorOptions: {
      preprocessorOptions: {
        scss: {
          charset: false,
          additionalData: `@use "@/styles/variables.scss" as *;`,
        },
      },
    },
  },
  plugins: [
    uni({
      vueOptions: {
        reactivityTransform: true,
      },
      viteLegacyOptions: {
        targets: ['ios >= 10', 'chrome >= 53'],
      },
    }),
    vueMarcos(),
    autoImport({
      dirs: ['src/composables', 'src/composables/**', 'src/stores', 'src/stores/**'],
      imports: [
        'vue',
        'vue/macros',
        'pinia',
        '@vueuse/core',
        'uni-app',
        {
          'uni-app-use': [
            ['useColorMode', 'useUniColorMode'],
            ['useDark', 'useUniDark'],
            ['useDownloadFile', 'useUniDownloadFile'],
            ['useInterceptor', 'useUniInterceptor'],
            ['useNetwork', 'useUniNetwork'],
            ['useOnline', 'useUniOnline'],
            ['usePreferredDark', 'useUniPreferredDark'],
            ['usePreferredLanguage', 'useUniPreferredLanguage'],
            ['useRequest', 'useUniRequest'],
            ['useStorageAsync', 'useUniStorageAsync'],
            ['useUploadFile', 'useUniUploadFile'],
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
        // {
        //   // FIX: breaks building
        //   type: 'component',
        //   resolve: (componentName) => {
        //     if (componentName.startsWith('Uni')) {
        //       return {
        //         name: 'default',
        //         from: `@dcloudio/uni-ui/lib/${paramCase(componentName)}/${paramCase(
        //           componentName,
        //         )}.vue`,
        //       };
        //     }
        //   },
        // },
        iconsResolver(),
      ],
      types: [],
    }),
    icons({
      compiler: 'vue3',
      defaultClass: 'el-icon',
    }),
    eslint({
      fix: true,
      lintOnStart: true,
    }),
    stylelint({
      fix: true,
      lintOnStart: true,
    }),
    inspect(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('src', import.meta.url)),
    },
  },
});
