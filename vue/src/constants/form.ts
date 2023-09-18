/* eslint-disable unicorn/better-regex */
import { PascalCaseViteMode } from './common';

/** 通用未填写错误信息 */
export const InputRequireErrorMessage = '请填写';
/** 通用未选择错误信息 */
export const SelectRequireErrorMessage = '请选择';
/** 通用未上传错误信息 */
export const UploadRequireErrorMessage = '请上传';

/** 账号键 */
export const UsernameKey = `username${PascalCaseViteMode}`;
/** 账号，以大小写字母或数字开头，后面任意 */
export const UsernameRegExp = /^[A-Za-z\d].+$/;
/** 默认账号 */
export const DefaultUsername = '';
/** 账号不符合格式错误信息 */
export const UsernameRegExpErrorMessage = '账号格式不正确，请检查';
/** 账号未填写错误信息 */
export const UsernameRequireErrorMessage = '请填写账号';
/** 密码，至少 8位，包含大小写字母和数字 */
export const PasswordRegExp = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/;
/** 密码不符合格式错误信息 */
export const PasswordRegExpErrorMessage = '密码至少 8 位，必须包含大小写字母和数字';
/** 两次密码不一致错误信息 */
export const PasswordShouldBeEqualErrorMessage = '两次密码输入不一致，请检查';
/** 两次密码一致错误信息 */
export const PasswordShouldNotBeEqualErrorMessage = '新旧密码不能一致，请修改';
/** 密码未填写错误信息 */
export const PasswordRequireErrorMessage = '请填写密码';
/** 手机号 */
export const PhoneNumberRegExp = /^(?:(?:\+|00)86)?1\d{10}$/;
/** 手机号不符合格式错误信息 */
export const PhoneNumberRegExpErrorMessage = '手机号格式不正确';
/** 手机号未填写错误信息 */
export const PhoneNumberRequireErrorMessage = '请填写手机号';
/** 手机号不能使用错误信息 */
export const PhoneNumberAvailableErrorMessage = '手机号已被使用，请更换手机号';
/** 验证码未填写错误信息 */
export const CaptchaRequireErrorMessage = '请填写验证码';
/** 邮箱 */
export const EmailRegExp =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\])|(([a-zA-Z\-\d]+\.)+[a-zA-Z]{2,}))$/;
/** 邮箱不符合格式错误信息 */
export const EmailRegExpErrorMessage = '邮箱格式不正确';
/** 邮箱未填写错误信息 */
export const EmailRequireErrorMessage = '请填写邮箱';
/* eslint-enable unicorn/better-regex */
