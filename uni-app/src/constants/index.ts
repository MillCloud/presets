import pkg from '@/../package.json';

export { default as pkg } from '@/../package.json';

export const Headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json; charset=utf-8',
  'X-Version': `${pkg.name}/${pkg.version}`,
};

export const TokenKey = 'token';
export const DefaultToken = '';
export const PageLimitKey = 'pageLimit';
export const DefaultPageLimit = 10;
