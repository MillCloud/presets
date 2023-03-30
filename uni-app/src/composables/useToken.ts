import { useStorage } from '@vueuse/core';
import { TokenKey, DefaultToken } from '@/constants';

export const useToken = (initialToken = DefaultToken) => {
  const token = useStorage(TokenKey, initialToken);
  return token;
};
