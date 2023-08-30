import dayjs from 'dayjs';
import { UsernameRegExp, PasswordRegExp, PhoneNumberRegExp, EmailRegExp } from '@/constants';

/** 校验账号 */
export const validateUsername = (username: string) => UsernameRegExp.test(username);

/** 校验密码 */
export const validatePassword = (password: string) => PasswordRegExp.test(password);

/** 校验电话号码 */
export const validatePhoneNumber = (phoneNumber: string) => PhoneNumberRegExp.test(phoneNumber);

/** 校验日期 */
export const validateDate = (date: any, format?: string) => dayjs(date, format).isValid();

/** 校验邮箱 */
export const validateEmail = (email: string) => EmailRegExp.test(email);
