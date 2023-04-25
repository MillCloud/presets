import App from './App.vue';
import { pinia } from './stores';
import { router, routerGuard } from './router';
import { browserUpdatePlugin, dayjsPlugin, vueQueryPlugin } from './plugins';

import 'nprogress/nprogress.css';
import '@/styles/preflight.css';
import '@/styles/element.scss';
import '@/styles/global.scss';
import 'uno.css';

const app = createApp(App)
  .use(pinia)
  .use(router)
  .use(routerGuard)
  .use(browserUpdatePlugin)
  .use(dayjsPlugin)
  .use(vueQueryPlugin);

app.mount('#app');
