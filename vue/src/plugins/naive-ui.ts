import naiveUi from 'naive-ui';
import naiveUIProComponents from 'naive-ui-pro-components';
import type { Plugin } from 'vue';

export const naiveUiPlugin: Plugin = {
  install: (app) => {
    app.use(naiveUi);
    app.use(naiveUIProComponents);
  },
};
