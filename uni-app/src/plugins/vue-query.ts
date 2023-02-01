import { VueQueryPlugin } from '@tanstack/vue-query';
import type { Plugin } from 'vue';
import { vueQueryPluginOptions } from '@/helpers';

export const plugin: Plugin = {
  install: (app) => {
    app.use(VueQueryPlugin, vueQueryPluginOptions);
  },
};
