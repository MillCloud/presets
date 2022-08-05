import { useLocalStorage } from 'usehooks-ts';
import { TokenKey, DefaultToken } from '@/constants';

export const useToken = () => {
  const [token, setToken] = useLocalStorage(TokenKey, DefaultToken);

  return [token, setToken];
};
