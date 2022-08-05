import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import pages from 'vite-plugin-pages';
import autoImport from 'unplugin-auto-import/vite';
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
      less: {
        javascriptEnabled: true,
      },
      scss: {
        charset: false,
        additionalData: `@use "@/styles/variables.scss" as *;`,
      },
    },
  },
  optimizeDeps: {
    include: Object.keys(dependencies),
  },
  plugins: [
    react(),
    pages({
      exclude: [
        '**/components/*.js',
        '**/components/*.jsx',
        '**/components/*.ts',
        '**/components/*.tsx',
      ],
    }),
    autoImport({
      dirs: ['src/hooks', 'src/hooks/**', 'src/stores', 'src/stores/**'],
      imports: [
        'react',
        'react-router-dom',
        'ahooks',
        {
          clsx: ['clsx'],
        },
      ],
    }),
    icons({
      compiler: 'jsx',
      jsx: 'react',
      defaultClass: 'anticon anticon-',
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
