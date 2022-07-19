import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { createSSRApp } from 'vue';
import { VueQueryPlugin } from 'vue-query';
import App from './App.vue';
import { pinia } from './stores';
import { vueQueryPluginOptions } from './helpers';
import '@modyqyw/tailwind-presets/miniprogram-base.css';
import '@/styles/tailwind.css';
import '@/styles/global.scss';

dayjs.locale('zh-cn');
dayjs.extend(customParseFormat);

export function createApp() {
  const app = createSSRApp(App).use(pinia).use(VueQueryPlugin, vueQueryPluginOptions);
  return { app };
}
