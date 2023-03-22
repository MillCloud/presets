import pkg from '@/package.json';

export { default as pkg } from '@/package.json';

// 请求
/** 默认请求头 */
export const DefaultHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json; charset=utf-8',
  'X-Requested-With': 'XMLHttpRequest',
  'X-Version': `${pkg.name}/${pkg.version}`,
};
/** 登录态键 */
export const TokenKey = 'token';
/** 默认登录态 */
export const DefaultToken = '';

// 通用
/** 每页条目键 */
export const PageSizeKey = 'pageSize';
/** 默认每页条目 */
export const DefaultPageSize = 10;
/** 可选每页条目 */
export const PageSizes = [10, 20, 50, 100];
