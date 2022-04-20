import { setupLayouts } from 'virtual:generated-layouts';
import generatedRoutes from 'virtual:generated-pages';
import { createRouter, createWebHashHistory } from 'vue-router';

const routes = setupLayouts(generatedRoutes);

export default createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior: () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  },
});
