import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';
import postcssPresetEnv from 'postcss-preset-env';
import uniManifest from '@uni-helper/vite-plugin-uni-manifest';
import uniPages from '@uni-helper/vite-plugin-uni-pages';
import uniLayouts from '@uni-helper/vite-plugin-uni-layouts';
import autoImport from 'unplugin-auto-import/vite';
import { UniUseAutoImports } from '@uni-helper/uni-use';
import uniComponents from '@uni-helper/vite-plugin-uni-components';
import { UniUIResolver } from '@uni-helper/vite-plugin-uni-components/resolvers';
import unocss from 'unocss/vite';
import IconsResolver from 'unplugin-icons/resolver';
import icons from 'unplugin-icons/vite';
import vueMacros from 'unplugin-vue-macros/vite';
import uni from '@dcloudio/vite-plugin-uni';

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
      scss: {
        charset: false,
        additionalData: `@import '@/styles/variables.scss';`,
      },
    },
  },
  envPrefix: ['VITE_', 'UNI_'],
  optimizeDeps: {
    exclude: ['vue-demi'],
  },
  plugins: [
    uniManifest({ minify: true }),
    uniPages({ minify: true }),
    uniLayouts(),
    autoImport({
      dirs: ['helpers', 'composables', 'constants', 'helpers', 'stores', 'utils'].map(
        (item) => `src/${item}/**`,
      ),
      imports: ['vue', 'pinia', 'uni-app', '@vueuse/core', UniUseAutoImports],
      vueTemplate: true,
    }),
    uniComponents({
      resolvers: [IconsResolver(), UniUIResolver()],
      directoryAsNamespace: true,
      collapseSamePrefixes: true,
    }),
    unocss(),
    icons({
      compiler: 'vue3',
    }),
    vueMacros(),
    uni({
      vueOptions: {},
      vueJsxOptions: {},
      viteLegacyOptions: {
        targets: ['ios >= 10', 'chrome >= 53'],
        polyfills: true,
        modernPolyfills: true,
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('src', import.meta.url)),
    },
  },
});
