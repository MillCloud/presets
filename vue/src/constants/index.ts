import { pascalCase } from 'change-case';
import pkg from '@/../package.json';

const ViteMode = import.meta.env.VITE_MODE as string;
const PascalCaseViteMode = pascalCase(ViteMode);

export { default as pkg } from '@/../package.json';

// 请求
/** 默认请求头 */
export const DefaultHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json; charset=utf-8',
  'X-Requested-With': 'XMLHttpRequest',
  'X-Version': `${pkg.name}/${pkg.version}`,
};
/** 登录态键 */
export const TokenKey = `token${PascalCaseViteMode}`;
/** 默认登录态 */
export const DefaultToken = '';

// 通用
/** 每页条目键 */
export const PageSizeKey = `pageSize${PascalCaseViteMode}`;
/** 默认每页条目 */
export const DefaultPageSize = 10;
/** 默认可选每页条目 */
export const DefaultPageSizes = [10, 20, 50, 100];
