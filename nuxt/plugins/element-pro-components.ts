import epc from 'element-pro-components';
import 'element-pro-components/lib/styles/index';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(epc);
});
