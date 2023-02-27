// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config';
import unpluginVueDefineOptions from 'unplugin-vue-define-options';
import viteEslint from 'vite-plugin-eslint2';
import viteStylelint from 'vite-plugin-stylelint';

// track https://github.com/nuxt/nuxt/issues/14634 for legacy browsers support

export default defineNuxtConfig({
  imports: {
    dirs: [
      '@/composables',
      '@/composables/**',
      '@/helpers',
      '@/helpers/**',
      '@/stores',
      '@/stores/**',
      '@/utils',
      '@/utils/**',
    ],
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
  build: {
    transpile: ['element-plus/es'],
  },
  css: [
    'nprogress/nprogress.css',
    'modern-normalize',
    '@/styles/preflight.css',
    '@/styles/element.scss',
    '@/styles/global.scss',
  ],
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@unocss/nuxt',
    '@vueuse/nuxt',
    'nuxt-icon',
    'nuxt-typed-router',
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
      viteEslint({
        fix: true,
        lintOnStart: true,
        include: [
          'components/**/*.{js,jsx,ts,tsx,vue}',
          'composables/**/*.{js,jsx,ts,tsx,vue}',
          'constants/**/*.{js,jsx,ts,tsx,vue}',
          'content/**/*.{js,jsx,ts,tsx,vue}',
          'helpers/**/*.{js,jsx,ts,tsx,vue}',
          'layouts/**/*.{js,jsx,ts,tsx,vue}',
          'middleware/**/*.{js,jsx,ts,tsx,vue}',
          'middlewares/**/*.{js,jsx,ts,tsx,vue}',
          'pages/**/*.{js,jsx,ts,tsx,vue}',
          'plugins/**/*.{js,jsx,ts,tsx,vue}',
          'server/**/*.{js,jsx,ts,tsx,vue}',
          'src/**/*.{js,jsx,ts,tsx,vue}',
          'stores/**/*.{js,jsx,ts,tsx,vue}',
          'styles/**/*.{js,jsx,ts,tsx,vue}',
          'utils/**/*.{js,jsx,ts,tsx,vue}',
          'app.vue',
          'App.vue',
          'error.vue',
          'Error.vue',
          'app.config.ts',
          'nuxt.config.ts',
        ],
      }),
      viteStylelint({
        fix: true,
        lintOnStart: true,
        include: [
          'components/**/*.{css,scss,vue}',
          'content/**/*.{css,scss,vue}',
          'layouts/**/*.{css,scss,vue}',
          'pages/**/*.{css,scss,vue}',
          'server/**/*.{css,scss,vue}',
          'src/**/*.{css,scss,vue}',
          'styles/**/*.{css,scss,vue}',
          'app.vue',
          'App.vue',
          'error.vue',
          'Error.vue',
        ],
      }),
    ],
  },
  pinia: {
    autoImports: ['defineStore'],
  },
  tailwindcss: {
    cssPath: 'styles/tailwind.css',
    injectPosition: 'last',
    exposeConfig: true,
  },
});
