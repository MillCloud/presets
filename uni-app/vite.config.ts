import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';
import vueMarcos from 'unplugin-vue-macros/vite';
import uni from '@dcloudio/vite-plugin-uni';
import tailwindcss from 'tailwindcss';
// @ts-ignore
import nested from 'tailwindcss/nesting';
// @ts-ignore
import postcssPresetEnv from 'postcss-preset-env';
import uniAppTailwind from 'unplugin-uni-app-tailwind';
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
    // TODO: wait for vite 3 support
    // commonjsOptions: {
    //   include: [],
    // },
    target: 'es6',
  },
  css: {
    // FIX: not support postcss config file yet
    postcss: {
      plugins: [
        nested(),
        tailwindcss(),
        postcssPresetEnv({
          stage: 3,
          features: { 'nesting-rules': false },
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
  // TODO: wait for vite 3 support
  // optimizeDeps: {
  //   disabled: false,
  //   exclude: ['vue-demi'],
  // },
  plugins: [
    vueMarcos(),
    uni({
      vueOptions: {
        reactivityTransform: true,
      },
      viteLegacyOptions: {
        targets: ['ios >= 10', 'chrome >= 53'],
      },
    }),
    uniAppTailwind.vite(),
    autoImport({
      dirs: ['src/composables', 'src/composables/**', 'src/stores', 'src/stores/**'],
      imports: ['vue', 'vue/macros', 'pinia', '@vueuse/core', 'uni-app'],
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
