export interface UserInfo {
  id?: number;
  username?: string;
  created_at?: string;
  updated_at?: string;
  role?: string;
  access?: string[];
}

/** 获取认证/鉴权相关信息 */
export const useAuthStore = defineStore('auth', () => {
  const token = useToken();
  const setToken = (newToken = DefaultToken) => {
    token.value = newToken;
  };

  /** token 是否新鲜，如果不新鲜，说明需要登录或刷新登录态 */
  const isTokenFresh = ref(false);
  const setIsTokenFresh = (newIsTokenFresh = false) => {
    isTokenFresh.value = newIsTokenFresh;
  };

  /** 用户信息 */
  const userInfo = ref<UserInfo>({});
  const setUserInfo = (newUserInfo: UserInfo = {}) => {
    userInfo.value = { ...newUserInfo };
  };
  /** 用户 id */
  const userId = computed(() => userInfo.value.id ?? 0);
  /** 用户角色 */
  const userRole = computed(() => userInfo.value.role ?? '');
  /** 用户权限 */
  const userAccess = computed(() => userInfo.value.access ?? []);

  const hasToken = computed(() => !!token.value);
  /** 是否已经登录 */
  const isSignedIn = computed(() => hasToken.value && isTokenFresh.value);
  /** 是否拥有用户信息 */
  const hasUserId = computed(() => !!userId.value);
  /** 是否拥有用户角色 */
  const hasUserRole = computed(() => !!userRole.value);
  /** 是否拥有用户权限 */
  const hasUserAccess = computed(() => userAccess.value.length > 0);
  /** 是否可以正式使用 */
  const isReady = computed(() => isSignedIn.value && hasUserId.value);

  return {
    token,
    setToken,
    isTokenFresh,
    setIsTokenFresh,
    userInfo,
    setUserInfo,
    userId,
    userRole,
    userAccess,
    isSignedIn,
    hasUserId,
    hasUserRole,
    hasUserAccess,
    isReady,
  };
});
