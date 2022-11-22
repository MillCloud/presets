import epc from 'element-pro-components';
import 'element-pro-components/lib/styles/index';
import type { Plugin } from 'vue';

export const plugin: Plugin = {
  install: (app) => {
    app.use(epc);
  },
};
