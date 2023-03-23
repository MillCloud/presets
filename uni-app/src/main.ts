// check https://wechat-miniprogram.github.io/miniprogram-compat/
// import 'core-js/actual';
import 'core-js/actual/structured-clone';
import 'core-js/actual/array/iterator';
import 'core-js/actual/array/flat';
import 'core-js/actual/array/flat-map';
import 'core-js/actual/object/entries';
import 'core-js/actual/object/from-entries';
import 'core-js/actual/object/values';
import 'core-js/actual/promise';
import 'core-js/actual/promise/all-settled';
import 'core-js/actual/promise/any';
import 'core-js/actual/promise/finally';
import 'core-js/actual/string/match-all';
import 'core-js/actual/string/pad-end';
import 'core-js/actual/string/pad-start';
import 'core-js/actual/string/replace-all';
import 'core-js/actual/string/trim-end';
import 'core-js/actual/string/trim-start';
import { createSSRApp } from 'vue';
import { pinia } from './stores';
import App from './App.vue';
import { dayjsPlugin, vueQueryPlugin } from './plugins';

import '@/styles/preflight.css';
import 'modern-normalize';
import '@/styles/global.scss';
import '@/styles/tailwind.css';

export function createApp() {
  const app = createSSRApp(App).use(pinia).use(dayjsPlugin).use(vueQueryPlugin);
  return { app };
}
