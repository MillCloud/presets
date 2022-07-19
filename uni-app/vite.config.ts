import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';
import uni from '@dcloudio/vite-plugin-uni';
import vueDefineOptions from 'unplugin-vue-define-options/vite';
import tailwindcss from 'tailwindcss';
// @ts-ignore
import postcssPresetEnv from 'postcss-preset-env';
import autoImport from 'unplugin-auto-import/vite';
import vueComponents from 'unplugin-vue-components/vite';
import IconsResolver from 'unplugin-icons/resolver';
import icons from 'unplugin-icons/vite';
import env from 'vite-plugin-env-compatible';
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
      // FIX: nothing happened, must use UNI_OUTPUT_DIR
      // outputDir: path.resolve(process.cwd(), 'dist', process.env.UNI_PLATFORM ?? 'h5'),
      // https://github.com/dcloudio/uni-app/issues/3248
      vueOptions: {
        reactivityTransform: true,
      },
      viteLegacyOptions: {
        targets: ['ios >= 10', 'chrome >= 53'],
      },
    }),
    vueDefineOptions(),
    autoImport({
      dirs: ['src/composables', 'src/stores'],
      imports: ['vue', 'vue/macros', 'pinia', '@vueuse/core'],
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
            // FIX: breaks building
            // if (componentName.startsWith('Uni')) {
            //   return {
            //     name: 'default',
            //     from: `@dcloudio/uni-ui/lib/${paramCase(componentName)}/${paramCase(
            //       componentName,
            //     )}.vue`,
            //   };
            // }
            // if (componentName.startsWith('Tui')) {
            //   return {
            //     name: 'default',
            //     from: `thorui-uni/lib/thorui/${paramCase(componentName)}/${paramCase(
            //       componentName,
            //     )}.vue`,
            //   };
            // }
          },
        },
        IconsResolver(),
      ],
      types: [],
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
    inspect(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('src', import.meta.url)),
    },
  },
});
