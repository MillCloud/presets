import browserUpdate from 'browser-update';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import ElementPlus from 'element-plus';
import ElementProComponents from 'element-pro-components';
import 'element-pro-components/lib/styles/index';
import { createPinia } from 'pinia';
import { createApp } from 'vue';
import { VueQueryPlugin } from 'vue-query';
import App from './App.vue';
import Components from './components';
import router from './router';
import { vueQueryPluginOptions } from './helpers';
import 'modern-normalize';
import '@/styles/preflight.css';
import '@/styles/element.scss';
import '@/styles/tailwind.css';
import 'nprogress/nprogress.css';
import '@/styles/global.scss';
import '@/guard';

dayjs.locale('zh-cn');
dayjs.extend(customParseFormat);

browserUpdate({
  required: { e: 79, f: 67, o: 50, s: 12, c: 63 },
  insecure: true,
  unsupported: true,
});

createApp(App)
  .use(createPinia())
  .use(router)
  .use(ElementPlus)
  .use(ElementProComponents)
  .use(VueQueryPlugin, vueQueryPluginOptions)
  .use(Components)
  .mount('#app');
