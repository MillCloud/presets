import { Icon } from '@iconify/vue';
import VRouterView from './VRouterView.vue';
import VSpacer from './VSpacer.vue';
import type { Plugin } from 'vue';

const Components: Plugin = {
  install: (app) => {
    app
      .component('VIcon', Icon)
      .component('VRouterView', VRouterView)
      .component('VSpacer', VSpacer);
  },
};

export default Components;
