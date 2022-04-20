import { TokenKey, DefaultToken } from '../constants';

export const getToken = () => localStorage.getItem(TokenKey) ?? DefaultToken;

export const setToken = (token = DefaultToken) => localStorage.setItem(TokenKey, token);
