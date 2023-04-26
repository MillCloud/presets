import elementPlus from 'element-plus';
import type { Plugin } from 'vue';

export const elementPlusPlugin: Plugin = {
  install: (app) => {
    app.use(elementPlus);
  },
};
