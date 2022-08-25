import { createSSRApp } from 'vue';

import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import customParseFormat from 'dayjs/plugin/customParseFormat';

import { VueQueryPlugin } from 'vue-query';

import App from './App.vue';
import { vueQueryPluginOptions } from './helpers';

import 'modern-normalize';
import '@/styles/preflight.css';
import '@/styles/tailwind.css';
import '@/styles/global.scss';
import '@/styles/remixicon.css';

dayjs.locale('zh-cn');
dayjs.extend(customParseFormat);

export function createApp() {
  const app = createSSRApp(App).use(pinia).use(VueQueryPlugin, vueQueryPluginOptions);
  return { app };
}
