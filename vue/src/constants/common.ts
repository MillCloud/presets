import { pascalCase } from 'change-case';
import pkg from '@/../package.json';

export { default as pkg } from '@/../package.json';

export const ViteMode = (import.meta.env.VITE_MODE || 'production') as string;
export const PascalCaseViteMode = pascalCase(ViteMode);

/** 默认占位头像 */
export const DefaultAvatar = 'https://placekitten.com/64/64';
/** 短日期格式 */
export const DayjsShortFormat = 'YYYY-MM-DD';
/** 日期格式 */
export const DayjsFormat = 'YYYY 年 MM 月 DD 日';
/** 短完整日期时间格式 */
export const DayjsShortFullFormat = 'YYYY-MM-DD HH:mm:ss';
/** 完整日期时间格式 */
export const DayjsFullFormat = 'YYYY 年 MM 月 DD 日 HH 时 mm 分 ss 秒';
/** ISO 8601 日期时间格式 */
export const ISO8601Format = 'YYYY-MM-DDTHH:mm:ssZ';

/** 默认请求基地址 */
export const DefaultBaseUrl =
  import.meta.env.VITE_REQUEST_BASE_URL || 'https://jsonplaceholder.typicode.com/';
// export const DefaultBaseUrl = import.meta.env.VITE_REQUEST_BASE_URL || '';
/** 默认请求头 */
export const DefaultHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json; charset=utf-8',
  'X-Requested-With': 'XMLHttpRequest',
  'X-Version': `${pkg.name}-${import.meta.env.VITE_MODE}/${pkg.version}`,
};
/** FormData 请求头 */
export const MultipartFormDataHeaders = {
  'Content-Type': 'multipart/form-data',
};
/** 登录态键 */
export const TokenKey = `token${PascalCaseViteMode}`;
/** 默认登录态 */
export const DefaultToken = '';
/** 每页条目键 */
export const PageSizeKey = `pageSize${PascalCaseViteMode}`;
/** 默认每页条目 */
export const DefaultPageSize = 10;
/** 默认可选每页条目 */
export const DefaultPageSizes = [10, 20, 30, 40, 50];
