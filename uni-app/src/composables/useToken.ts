import { useStorageAsync } from '@uni-helper/uni-use';
import { TokenKey, DefaultToken } from '@/constants';

export const useToken = (initialToken = DefaultToken) => {
  const token = useStorageAsync(TokenKey, initialToken);
  return token;
};
