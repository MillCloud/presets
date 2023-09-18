import { isString } from '@modyqyw/utils';

/** 解析路由名称 */
export const parseRouteName = (name: string | symbol | undefined | null) => {
  if (!name) return '';
  if (isString(name)) return name;
  return name.description ?? '';
};
