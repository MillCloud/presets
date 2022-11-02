import { fileURLToPath } from 'url';
import { defineConfig } from 'vitest/config';
import autoImport from 'unplugin-auto-import/vite';
import vueComponents from 'unplugin-vue-components/vite';
import vueMacros from 'unplugin-vue-macros/vite';
import uni from '@dcloudio/vite-plugin-uni';
import tailwindcss from 'tailwindcss';
import { basePreset, elementPlusPreset, miniprogramBasePreset } from 'tailwind-extensions';
import typography from '@tailwindcss/typography';
import lineClamp from '@tailwindcss/line-clamp';
// @ts-ignore
import nested from 'tailwindcss/nesting';
// @ts-ignore
import postcssPresetEnv from 'postcss-preset-env';
import uniAppTailwind from 'vite-plugin-uni-app-tailwind';
import unocss from 'unocss/vite';
import { presetIcons } from 'unocss';
import eslint from '@modyqyw/vite-plugin-eslint';
import stylelint from 'vite-plugin-stylelint';
import inspect from 'vite-plugin-inspect';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    target: 'es6',
    cssTarget: 'chrome61',
  },
  css: {
    // FIX: not support postcss config file yet
    postcss: {
      plugins: [
        nested(),
        // FIX: [plugin:unocss:global:build:scan] this.addWatchFile is not a function
        tailwindcss({
          config: {
            presets: [
              basePreset,
              elementPlusPreset({
                baseSelectors: [':root', 'page'],
              }),
              miniprogramBasePreset,
            ],
            plugins: [typography, lineClamp],
            content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
            theme: {
              screens: {},
            },
          },
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
    autoImport({
      dirs: ['src/composables', 'src/composables/**', 'src/stores', 'src/stores/**'],
      imports: ['vue', 'vue/macros', 'pinia', '@vueuse/core', 'uni-app'],
    }),
    vueComponents({
      dirs: ['src/components'],
      resolvers: [
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
      ],
      types: [],
    }),
    vueMacros(),
    unocss({
      presets: [presetIcons()],
      safelist: ['dark'],
    }),
    uni({
      vueOptions: {
        reactivityTransform: true,
      },
      vueJsxOptions: {},
      viteLegacyOptions: {
        targets: ['ios >= 10', 'chrome >= 53'],
      },
    }),
    uniAppTailwind(),
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
  test: {
    coverage: {
      provider: 'c8',
      reporter: ['text', 'json', 'html'],
    },
    environment: 'jsdom',
    threads: false,
  },
});
