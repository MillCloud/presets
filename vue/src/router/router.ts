import { createRouter, createWebHistory } from 'vue-router';
import { createGetRoutes, setupLayouts } from 'virtual:meta-layouts';
import { routes as autoRoutes } from 'vue-router/auto/routes';
import type { RouteRecordRaw } from 'vue-router/auto';

console.log('');

export { routes as autoRoutes } from 'vue-router/auto/routes';
console.log('🚀 ~ file: router.ts:9 ~ autoRoutes:', autoRoutes);

const patchRoute = (route: RouteRecordRaw, parent?: RouteRecordRaw): RouteRecordRaw => {
  const newRoute = { ...route, path: parent ? [parent.path, route.path].join('/') : route.path };
  if (newRoute.children) {
    const child = newRoute.children.find((child) => child.path === '');
    if (child) {
      newRoute.meta = { ...newRoute.meta, ...child.meta };
    }
    newRoute.children = newRoute.children
      .filter((child) => child.path !== '')
      .toSorted((a, b) => ((a.meta?.sort ?? 0) as number) - ((b.meta?.sort ?? 0) as number))
      .map((child) => patchRoute(child, route));
  }
  return newRoute;
};
export const patchedRoutes = autoRoutes
  .filter(
    (route) =>
      route.meta?.layout !== 'simple' &&
      route.meta?.hidden !== true &&
      !parseRouteName(route.name).startsWith('$'),
  )
  .toSorted((a, b) => ((a.meta?.sort ?? 0) as number) - ((b.meta?.sort ?? 0) as number))
  .map((route) => patchRoute(route));
console.log('🚀 ~ file: router.ts:32 ~ patchedRoutes:', patchedRoutes);

export const routes = setupLayouts(autoRoutes);
console.log('🚀 ~ file: router.ts:35 ~ routes:', routes);

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior: () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  },
});

export const parsedRoutes = createGetRoutes(router)();
console.log('🚀 ~ file: router.ts:49 ~ parsedRoutes:', parsedRoutes);
