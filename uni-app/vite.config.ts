import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';
import unpluginVueDefineOptions from 'unplugin-vue-define-options';
import autoImport from 'unplugin-auto-import/vite';
import vueComponents from 'unplugin-vue-components/vite';
import uni from '@dcloudio/vite-plugin-uni';
import tailwindcss from 'tailwindcss';
// @ts-expect-error no types
import nested from 'tailwindcss/nesting';
import postcssPresetEnv from 'postcss-preset-env';
import uniTailwind from '@uni-helper/vite-plugin-uni-tailwind';
import tailwindcssConfig from './tailwind.config.cjs';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    target: 'es6',
    cssTarget: 'chrome61',
  },
  css: {
    postcss: {
      plugins: [
        nested(),
        tailwindcss({
          config: tailwindcssConfig,
        }),
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
  envPrefix: ['VITE_', 'UNI_'],
  optimizeDeps: {
    exclude: ['vue-demi'],
  },
  plugins: [
    unpluginVueDefineOptions.vite(),
    autoImport({
      imports: ['vue', 'pinia', '@vueuse/core', 'uni-app'],
    }),
    vueComponents({
      dirs: ['src/components'],
      resolvers: [
        // {
        //   // FIXME breaks building
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
      ],
      types: [],
    }),
    uni({
      vueOptions: {},
      vueJsxOptions: {},
      viteLegacyOptions: {
        targets: ['ios >= 10', 'chrome >= 53'],
        polyfills: true,
        modernPolyfills: true,
      },
    }),
    uniTailwind(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('src', import.meta.url)),
    },
  },
});
