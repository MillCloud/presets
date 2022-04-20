import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { createPinia } from 'pinia';
import { createSSRApp } from 'vue';
import { VueQueryPlugin } from 'vue-query';
import App from './App.vue';
import Components from './components';
import { vueQueryPluginOptions } from './helpers';
import '@/styles/preflight.css';
import '@/styles/tailwind.css';
import '@/styles/global.scss';

dayjs.locale('zh-cn');
dayjs.extend(customParseFormat);

export function createApp() {
  const app = createSSRApp(App)
    .use(createPinia())
    .use(VueQueryPlugin, vueQueryPluginOptions)
    .use(Components);
  return { app };
}
