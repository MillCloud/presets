import { describe, it, expect, beforeAll } from 'vitest';
import dayjs from 'dayjs';
import 'dayjs/locale/types.d.ts';
import 'dayjs/locale/zh-cn';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import updateLocale from 'dayjs/plugin/updateLocale';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import duration from 'dayjs/plugin/duration';
import {
  formatShortDate,
  formatDate,
  formatShortFullDate,
  formatFullDate,
  formatReadableDate,
} from './formatter';

describe('helpers/formatter', () => {
  beforeAll(() => {
    dayjs.extend(utc);
    dayjs.extend(timezone);
    dayjs.extend(updateLocale);
    dayjs.extend(customParseFormat);
    dayjs.extend(duration);
    const updatedLocale: Partial<ILocale> = {
      weekStart: 0,
    };
    dayjs.updateLocale('zh-cn', updatedLocale);
    dayjs.locale('zh-cn');
    dayjs.tz.setDefault('Asia/Shanghai');
  });

  it('formatShortDate', () => {
    expect(formatShortDate(0)).toBe('1970-01-01');
    expect(formatShortDate(1_645_539_742_000)).toBe('2022-02-22');
  });

  it('formatDate', () => {
    expect(formatDate(0)).toBe('1970 年 01 月 01 日');
    expect(formatDate(1_645_539_742_000)).toBe('2022 年 02 月 22 日');
  });

  it('formatShortFullDate', () => {
    expect(formatShortFullDate(0)).toBe('1970-01-01 08:00:00');
    expect(formatShortFullDate(1_645_539_742_000)).toBe('2022-02-22 22:22:22');
  });

  it('formatDate', () => {
    expect(formatFullDate(0)).toBe('1970 年 01 月 01 日 08 时 00 分 00 秒');
    expect(formatFullDate(1_645_539_742_000)).toBe('2022 年 02 月 22 日 22 时 22 分 22 秒');
  });

  it('formatReadableDate', () => {
    expect(formatReadableDate()).toBe('');
    expect(formatReadableDate(dayjs())).toBe('刚刚');
    expect(formatReadableDate(dayjs().subtract(59, 's'))).toBe('刚刚');
    expect(formatReadableDate(dayjs().subtract(1, 'm'))).toBe('1 分钟前');
    expect(formatReadableDate(dayjs().subtract(59, 'm'))).toBe('59 分钟前');
    expect(formatReadableDate(dayjs().subtract(1, 'h'))).toBe('1 小时前');
    expect(formatReadableDate(dayjs().subtract(23, 'h'))).toBe('23 小时前');
    expect(formatReadableDate(dayjs().subtract(1, 'd'))).toBe('昨天');
    expect(formatReadableDate(dayjs().subtract(2, 'd'))).toBe('前天');
    expect(formatReadableDate(dayjs().subtract(3, 'd'))).toBe('3 天前');
    expect(formatReadableDate(dayjs().subtract(31, 'd'))).toBe(
      dayjs().subtract(31, 'd').format('YYYY-MM-DD'),
    );
  });
});
