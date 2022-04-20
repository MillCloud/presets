import pkg from '@/../package.json';

export { default as pkg } from '@/../package.json';

export const Headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json; charset=utf-8',
  'X-Requested-With': 'XMLHttpRequest',
  'X-Version': `${pkg.name}/${pkg.version}`,
};

// use it with https://vueuse.org/core/usestorage/
export const TokenKey = 'token';
export const DefaultToken = '';
export const PageLimitKey = 'pageLimit';
export const DefaultPageLimit = 10;
export const PageLimits = [10, 20, 50, 100];
