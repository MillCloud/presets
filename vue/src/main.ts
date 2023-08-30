import App from './App.vue';
import { pinia } from './stores';
import { router, routerGuard } from './router';
import { browserUpdatePlugin, dayjsPlugin, naiveUiPlugin, vueQueryPlugin } from './plugins';
import './styles';

const app = createApp(App)
  .use(pinia)
  .use(router)
  .use(routerGuard)
  .use(browserUpdatePlugin)
  .use(dayjsPlugin)
  .use(naiveUiPlugin)
  .use(vueQueryPlugin);

app.mount('#app');
