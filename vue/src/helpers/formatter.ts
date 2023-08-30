import dayjs from 'dayjs';
import { DayjsShortFormat, DayjsFormat, DayjsShortFullFormat, DayjsFullFormat } from '@/constants';

/**
 * 自定义格式化日期
 *
 * @param date 指定日期
 * @param format 默认为 YYYY-MM-DD
 */
export const customFormatDate = (
  date?: string | number | Date | dayjs.Dayjs | null | undefined,
  format = DayjsShortFormat,
) => dayjs(date).format(format);

/**
 * 将日期格式化成 YYYY-MM-DD 格式
 *
 * @param date 指定日期
 */
export const formatShortDate = (date?: string | number | Date | dayjs.Dayjs | null | undefined) =>
  customFormatDate(date, DayjsShortFormat);

/**
 * 将日期格式化成 YYYY 年 MM 月 DD 日 格式
 *
 * @param date 指定日期
 */
export const formatDate = (date?: string | number | Date | dayjs.Dayjs | null | undefined) =>
  customFormatDate(date, DayjsFormat);

/**
 * 将日期格式化成 YYYY-MM-DD HH:mm:ss 格式
 *
 * @param date 指定日期
 */
export const formatShortFullDate = (
  date?: string | number | Date | dayjs.Dayjs | null | undefined,
) => customFormatDate(date, DayjsShortFullFormat);

/**
 * 将日期格式化成 YYYY 年 MM 月 DD 日 HH 时 mm 分 ss 秒 格式
 *
 * @param date 指定日期
 */
export const formatFullDate = (date?: string | number | Date | dayjs.Dayjs | null | undefined) =>
  customFormatDate(date, DayjsFullFormat);

/** 将日期格式化成人类语言字符串 */
export const formatReadableDate = (
  date?: string | number | Date | dayjs.Dayjs | null | undefined,
) => {
  if (!date || !dayjs(date).isValid()) return '';
  const target = dayjs(date);
  const now = dayjs();
  const diffSeconds = now.diff(target, 's');
  if (diffSeconds < 60) return '刚刚';
  const diffMinutes = now.diff(target, 'm');
  if (diffMinutes < 60) return `${diffMinutes} 分钟前`;
  const diffHours = now.diff(target, 'h');
  if (diffHours < 24) return `${diffHours} 小时前`;
  const diffDays = now.diff(target, 'd');
  if (diffDays === 1) return '昨天';
  if (diffDays === 2) return '前天';
  if (diffDays < 30) return `${diffDays} 天前`;
  return target.format('YYYY-MM-DD');
};
