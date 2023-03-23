import App from './App.vue';
import { pinia } from './stores';
import { router, routerGuardPlugin } from './router';
import { browserUpdatePlugin, dayjsPlugin, elementPlusPlugin, vueQueryPlugin } from './plugins';

import 'nprogress/nprogress.css';
import 'modern-normalize';
import '@/styles/preflight.css';
import '@/styles/element.scss';
import '@/styles/global.scss';
import '@/styles/tailwind.css';

const app = createApp(App)
  .use(pinia)
  .use(router)
  .use(routerGuardPlugin)
  .use(browserUpdatePlugin)
  .use(dayjsPlugin)
  .use(elementPlusPlugin)
  .use(vueQueryPlugin);

app.mount('#app');
