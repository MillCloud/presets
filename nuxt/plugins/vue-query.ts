import type { DehydratedState } from '@tanstack/vue-query';
import { VueQueryPlugin, hydrate, dehydrate } from '@tanstack/vue-query';
import { useState } from '#app';
import { vueQueryPluginOptions, vueQueryClient } from '@/helpers';

export default defineNuxtPlugin((nuxt) => {
  const vueQueryState = useState<DehydratedState | null>('vue-query');

  nuxt.vueApp.use(VueQueryPlugin, vueQueryPluginOptions);

  if (process.server) {
    nuxt.hooks.hook('app:rendered', () => {
      vueQueryState.value = dehydrate(vueQueryClient);
    });
  }

  if (process.client) {
    nuxt.hooks.hook('app:created', () => {
      hydrate(vueQueryClient, vueQueryState.value);
    });
  }
});
