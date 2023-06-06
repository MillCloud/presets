import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';
import postcssPresetEnv from 'postcss-preset-env';
import uniManifest from '@uni-helper/vite-plugin-uni-manifest';
import uniPages from '@uni-helper/vite-plugin-uni-pages';
import uniLayouts from '@uni-helper/vite-plugin-uni-layouts';
import autoImport from 'unplugin-auto-import/vite';
import uniComponents from '@uni-helper/vite-plugin-uni-components';
import { UniUIResolver } from '@uni-helper/vite-plugin-uni-components/resolvers';
import unocss from 'unocss/vite';
import IconsResolver from 'unplugin-icons/resolver';
import icons from 'unplugin-icons/vite';
import uni from '@dcloudio/vite-plugin-uni';
import uniTailwind from '@uni-helper/vite-plugin-uni-tailwind';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    target: 'es6',
    cssTarget: 'chrome61',
  },
  css: {
    postcss: {
      plugins: [postcssPresetEnv()],
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
    uniManifest(),
    uniPages(),
    uniLayouts(),
    autoImport({
      imports: ['vue', 'pinia', '@vueuse/core', 'uni-app'],
    }),
    uniComponents({
      resolvers: [UniUIResolver(), IconsResolver()],
    }),
    unocss(),
    icons({
      compiler: 'vue3',
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
