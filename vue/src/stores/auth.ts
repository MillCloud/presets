import { useToken } from '@/composables';
import { DefaultToken } from '@/constants';

export const useAuthStore = defineStore('auth', () => {
  const token = useToken();
  const setToken = (newToken = DefaultToken) => {
    token.value = newToken;
  };
  return {
    token,
    setToken,
  };
});
