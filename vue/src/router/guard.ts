import nprogress from 'nprogress';
import type { Plugin } from 'vue';
import { router } from './router';

export const routerGuard: Plugin = {
  install: () => {
    router.beforeEach((to, from, next) => {
      nprogress.start();

      // const authStore = useAuthStore();

      // 前往首页，直接放行
      // 首页会跳转到其它页面
      // if (to.path === '/') return next();

      // 前往登录页
      // if (to.path === '/sign-in') {
      //   // 未登录 / 没有用户信息 => 放行
      //   if (!authStore.isReady) return next();
      //   // 其余情况 => 跳转到首页，让首页处理接下来的事情
      //   return next('/');
      // }

      // 前往其它页面
      // 未登录 / 没有用户信息 => 跳转到首页，让首页处理接下来的事情
      // if (!authStore.isReady) return next('/');
      // 判断能否进入
      // RBAC
      // const requiredRoles = (to.meta?.roles ?? []) as string[];
      // if (requiredRoles.includes(authStore.userRole)) {
      //   // 记录页面并放行
      //   const cachedRoutesStore = useCachedRoutesStore();
      //   if (to.meta?.layout !== 'simple' && to.meta?.hidden !== true) {
      //     cachedRoutesStore.addCachedRoute({
      //       fullPath: to.fullPath,
      //       name: to.name as string,
      //       title: (to.meta?.title ?? to.name) as string,
      //     });
      //   }
      // } else {
      //   // 不能进入页面 => 回退到控制台
      //   if (from.path === '/dashboard') return next(`/dashboard?t=${Date.now()}`);
      //   return next('/dashboard');
      // }
      // ABAC
      // const requiredAccess = (to.meta?.access ?? []) as string[];
      // if (requiredAccess.some((access) => authStore.userAccess.includes(access))) {
      //   // 记录页面并放行
      //   const cachedRoutesStore = useCachedRoutesStore();
      //   if (to.meta?.layout !== 'simple' && to.meta?.hidden !== true) {
      //     cachedRoutesStore.addCachedRoute({
      //       fullPath: to.fullPath,
      //       name: to.name as string,
      //       title: (to.meta?.title ?? to.name) as string,
      //     });
      //   }
      // } else {
      //   // 不能进入页面 => 回退到控制台
      //   if (from.path === '/dashboard') return next(`/dashboard?t=${Date.now()}`);
      //   return next('/dashboard');
      // }

      // 直接记录页面并放行
      const cachedRoutesStore = useCachedRoutesStore();
      if (to.meta?.layout !== 'simple' && to.meta?.hidden !== true) {
        cachedRoutesStore.addCachedRoute({
          path: to.path,
          name: to.name as string,
          title: (to.meta?.title ?? to.name) as string,
        });
      }

      return next();
    });

    router.afterEach(() => {
      nprogress.done();
    });
  },
};
