// import 'core-js/actual';
import 'core-js/actual/array/iterator';
import 'core-js/actual/promise';
import 'core-js/actual/object/assign';
import 'core-js/actual/promise/finally';
import 'core-js/actual/string/replace-all';
import { createSSRApp } from 'vue';
import { pinia } from './stores';
import App from './App.vue';
import { dayjs, vueQuery } from './plugins';

import '@/styles/preflight.css';
import 'modern-normalize';
import '@/styles/global.scss';
import '@/styles/tailwind.css';
import 'uno.css';

export function createApp() {
  const app = createSSRApp(App).use(pinia).use(dayjs).use(vueQuery);
  return { app };
}
