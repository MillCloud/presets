// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config';
import unpluginVueDefineOptions from 'unplugin-vue-define-options';

// track https://github.com/nuxt/nuxt/issues/14634 for legacy browsers support

export default defineNuxtConfig({
  imports: {
    dirs: ['composables', 'helpers', 'stores', 'utils'].flatMap((item) => [
      `src/${item}`,
      `src/${item}/**`,
    ]),
  },
  app: {
    head: {
      meta: [
        { charset: 'utf8' },
        { name: 'renderer', content: 'webkit' },
        { name: 'force-rendering', content: 'webkit' },
        { 'http-equiv': 'x-ua-compatible', content: 'IE=Edge,chrome=1' },
        {
          name: 'viewport',
          content:
            'width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0',
        },
      ],
      link: [{ rel: 'icon', href: '/nuxt.svg', type: 'image/svg+xml' }],
      noscript: [{ children: '<strong>请允许 JavaScript 执行。</strong>' }],
    },
  },
  postcss: {
    plugins: {
      'tailwindcss/nesting': {},
      tailwindcss: {},
      'postcss-preset-env': {
        stage: 3,
        features: { 'nesting-rules': false },
      },
    },
  },
  css: [
    'nprogress/nprogress.css',
    'modern-normalize',
    '@/styles/preflight.css',
    '@/styles/element.scss',
    '@/styles/global.scss',
    '@/styles/tailwind.css',
  ],
  typescript: {
    shim: false,
  },
  vite: {
    build: {
      target: 'es6',
      cssTarget: 'chrome61',
    },
    css: {
      preprocessorOptions: {
        scss: {
          charset: false,
          additionalData: `@use "@/styles/variables.scss" as *;`,
        },
      },
    },
    plugins: [
      unpluginVueDefineOptions.vite(),
    ],
  },
  modules: ['@pinia/nuxt', '@vueuse/nuxt', 'nuxt-icon', 'nuxt-typed-router', 'nuxt-vitest'],
  pinia: {
    autoImports: ['defineStore'],
  },
  vueuse: {
    ssrHandlers: true,
  },
});
