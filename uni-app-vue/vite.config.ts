import path from 'node:path';
// import { fileURLToPath } from 'url';
import uni from '@dcloudio/vite-plugin-uni';
import eslint from '@modyqyw/vite-plugin-eslint';
import tailwindcss from 'tailwindcss';
// @ts-ignore
import postcssPresetEnv from 'postcss-preset-env';
import { defineConfig } from 'vite';
import env from 'vite-plugin-env-compatible';
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
    env({
      prefix: 'VITE',
    }),
    eslint({
      fix: true,
    }),
    stylelint({
      fix: true,
    }),
    inspect(),
  ],
  resolve: {
    alias: {
      // '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@/': `${path.resolve('src')}/`,
    },
  },
});
