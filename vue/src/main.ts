import ElementPlus from 'element-plus';
import ElementProComponents from 'element-pro-components';
import 'element-pro-components/lib/styles/index';

import browserUpdate from 'browser-update';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import customParseFormat from 'dayjs/plugin/customParseFormat';

import { VueQueryPlugin } from 'vue-query';

import App from './App.vue';
import router from './router';
import { vueQueryPluginOptions } from './helpers';

import 'nprogress/nprogress.css';
import 'modern-normalize';
import '@/styles/preflight.css';
import '@/styles/element.scss';
import '@/styles/tailwind.css';
import '@/styles/global.scss';
import '@/guard';

browserUpdate({
  required: { e: 79, f: 67, o: 50, s: 12, c: 63 },
  insecure: true,
  unsupported: true,
});

dayjs.locale('zh-cn');
dayjs.extend(customParseFormat);

createApp(App)
  .use(pinia)
  .use(router)
  .use(ElementPlus)
  .use(ElementProComponents)
  .use(VueQueryPlugin, vueQueryPluginOptions)
  .mount('#app');
