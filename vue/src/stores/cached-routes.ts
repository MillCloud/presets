export interface CachedRoute {
  fullPath: string;
  name: string;
  title: string;
}

export const useCachedRoutesStore = defineStore('cachedRoutes', () => {
  /** 缓存的路由 */
  const cachedRoutes = ref<CachedRoute[]>([]);
  const addCachedRoute = (route: CachedRoute) => {
    if (cachedRoutes.value.some((item) => item.fullPath === route.fullPath)) return;
    cachedRoutes.value.push(route);
  };
  const addCachedRoutes = (routes: CachedRoute[]) => {
    for (const route of routes) addCachedRoute(route);
  };
  const removeCachedRoute = (routeOrFullPath: CachedRoute | string) => {
    const fullPath =
      typeof routeOrFullPath === 'string' ? routeOrFullPath : routeOrFullPath.fullPath;
    const index = cachedRoutes.value.findIndex((item) => item.fullPath === fullPath);
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
