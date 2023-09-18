import { describe, it, expect } from 'vitest';
import { validatePassword } from './validator';

describe('helpers/validator', () => {
  it('validatePassword', () => {
    expect(validatePassword('')).toBe(false);
    expect(validatePassword('a')).toBe(false);
    expect(validatePassword('aa')).toBe(false);
    expect(validatePassword('aaa')).toBe(false);
    expect(validatePassword('aaaa')).toBe(false);
    expect(validatePassword('aaaaa')).toBe(false);
    expect(validatePassword('aaaaaa')).toBe(false);
    expect(validatePassword('aaaaaaa')).toBe(false);
    expect(validatePassword('aaaaaaaa')).toBe(false);
    expect(validatePassword('aaaaaaaaa')).toBe(false);
    expect(validatePassword('1')).toBe(false);
    expect(validatePassword('11')).toBe(false);
    expect(validatePassword('111')).toBe(false);
    expect(validatePassword('1111')).toBe(false);
    expect(validatePassword('11111')).toBe(false);
    expect(validatePassword('111111')).toBe(false);
    expect(validatePassword('1111111')).toBe(false);
    expect(validatePassword('11111111')).toBe(false);
    expect(validatePassword('111111111')).toBe(false);
    expect(validatePassword('aaaa1111')).toBe(false);
    expect(validatePassword('aaaa1111.')).toBe(false);
    expect(validatePassword('aAaa1111')).toBe(true);
  });
});
