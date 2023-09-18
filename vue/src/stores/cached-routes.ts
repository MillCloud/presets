export interface CachedRoute {
  path: string;
  name: string;
  title: string;
}

export const useCachedRoutesStore = defineStore('cachedRoutes', () => {
  /** 缓存的路由 */
  const cachedRoutes = ref<CachedRoute[]>([]);
  const addCachedRoute = (route: CachedRoute) => {
    if (cachedRoutes.value.some((item) => item.path === route.path)) return;
    cachedRoutes.value.push(route);
  };
  const addCachedRoutes = (routes: CachedRoute[]) => {
    for (const route of routes) addCachedRoute(route);
  };
  const removeCachedRoute = (routeOrPath: CachedRoute | string) => {
    const path = typeof routeOrPath === 'string' ? routeOrPath : routeOrPath.path;
    const index = cachedRoutes.value.findIndex((item) => item.path === path);
    if (index < 0) return;
    cachedRoutes.value.splice(index, 1);
  };
  const removeCachedRoutes = (routes?: CachedRoute[] | string[]) => {
    if (routes) {
      for (const route of routes) removeCachedRoute(route);
      return;
    }
    cachedRoutes.value = [];
  };

  return { cachedRoutes, addCachedRoute, addCachedRoutes, removeCachedRoute, removeCachedRoutes };
});
