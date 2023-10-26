// check https://wechat-miniprogram.github.io/miniprogram-compat/
// import 'core-js/actual';
import 'core-js/actual/structured-clone';
// import 'core-js/actual/array/flat'; // since 2.16.1
// import 'core-js/actual/array/flat-map'; // since 2.16.1
// import 'core-js/actual/object/entries'; // since 2.16.1
// import 'core-js/actual/object/from-entries'; // since 2.16.1
// import 'core-js/actual/object/values'; // since 2.16.1
// import 'core-js/actual/promise'; // since 2.11.0
// import 'core-js/actual/promise/all-settled'; // since 2.16.1
// import 'core-js/actual/promise/finally'; // since 2.16.1
// import 'core-js/actual/string/pad-end'; // since 2.16.1
// import 'core-js/actual/string/pad-start'; // since 2.16.1
import 'core-js/actual/string/replace-all'; // since 2.16.1 but consider other platforms
// import 'core-js/actual/string/trim-end'; // since 2.16.1
// import 'core-js/actual/string/trim-start'; // since 2.16.1
import { createSSRApp } from 'vue';
import { pinia } from './stores';
import App from './App.vue';
import { dayjsPlugin, vueQueryPlugin } from './plugins';

import './styles/button-preflight.css';
import '@unocss-applet/reset/uni-app/tailwind-compat.css';
import './styles/preflight.css';
import './styles/global.scss';
import 'virtual:uno.css';

export function createApp() {
  const app = createSSRApp(App).use(pinia).use(dayjsPlugin).use(vueQueryPlugin);
  return { app };
}
