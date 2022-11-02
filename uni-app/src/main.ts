// import 'core-js/actual';
import 'core-js/actual/array/iterator';
import 'core-js/actual/promise';
import 'core-js/actual/object/assign';
import 'core-js/actual/promise/finally';
import 'core-js/actual/string/replace-all';
import { createSSRApp } from 'vue';

import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import customParseFormat from 'dayjs/plugin/customParseFormat';

import { VueQueryPlugin } from '@tanstack/vue-query';

import App from './App.vue';
import { vueQueryPluginOptions } from './helpers';

import '@/styles/preflight.css';
import 'modern-normalize';
import '@/styles/tailwind.css';
import '@/styles/global.css';
// import 'uno.css';

dayjs.locale('zh-cn');
dayjs.extend(customParseFormat);

export function createApp() {
  const app = createSSRApp(App).use(pinia).use(VueQueryPlugin, vueQueryPluginOptions);
  return { app };
}
