import App from './App.vue';
import { pinia } from './stores';
import { guardRouter, router } from './router';
import { browserUpdate, dayjs, elementPlus, vueQuery } from './plugins';

import 'nprogress/nprogress.css';
import 'modern-normalize';
import '@/styles/preflight.css';
import '@/styles/element.scss';
import '@/styles/global.scss';
import '@/styles/tailwind.css';
import 'uno.css';

const app = createApp(App)
  .use(pinia)
  .use(router)
  .use(browserUpdate)
  .use(dayjs)
  .use(elementPlus)
  .use(vueQuery);

guardRouter();

app.mount('#app');
