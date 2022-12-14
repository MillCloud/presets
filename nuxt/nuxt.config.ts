// https://nuxt.com/docs/api/configuration/nuxt-config
import viteEslint from '@modyqyw/vite-plugin-eslint';
import viteStylelint from 'vite-plugin-stylelint';
// import viteMkcert from 'vite-plugin-mkcert';
import viteInspect from 'vite-plugin-inspect';

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
        { charset: 'utf-8' },
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
    'element-pro-components/lib/styles/index',
    'nprogress/nprogress.css',
    'modern-normalize',
    '@/styles/preflight.css',
    '@/styles/element.scss',
    '@/styles/global.scss',
  ],
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@unocss/nuxt',
    'unplugin-icons/nuxt',
    'nuxt-typed-router',
  ],
  experimental: {
    reactivityTransform: true,
  },
  postcss: {
    config: true,
  },
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
          'components/**/*.{css,less,scss,sass,vue}',
          'content/**/*.{css,less,scss,sass,vue}',
          'layouts/**/*.{css,less,scss,sass,vue}',
          'pages/**/*.{css,less,scss,sass,vue}',
          'server/**/*.{css,less,scss,sass,vue}',
          'src/**/*.{css,less,scss,sass,vue}',
          'styles/**/*.{css,less,scss,sass,vue}',
          'app.vue',
          'App.vue',
          'error.vue',
          'Error.vue',
        ],
      }),
      // viteMkcert({
      //   autoUpgrade: true,
      //   source: 'coding',
      // }),
      viteInspect(),
    ],
  },
  // FIXME
  // @ts-ignore
  pinia: {
    autoImports: ['defineStore'],
  },
  tailwindcss: {
    cssPath: 'styles/tailwind.css',
    injectPosition: 'last',
    exposeConfig: true,
  },
});
