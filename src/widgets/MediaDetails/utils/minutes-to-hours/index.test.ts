import { describe, it, expect } from 'vitest';
import type { Time, KeysTime } from './index.type';
import formatMinutesToHours from './index';

const mockT = (key: KeysTime): string => {
  const translations: Time = {
    h: 'год',
    min: 'хв',
  };

  return translations[key] || key;
};

describe('formatMinutesToHours', () => {
  it('returns null for invalid values', () => {
    expect(formatMinutesToHours(0, mockT)).toBe('');
    expect(formatMinutesToHours(-5, mockT)).toBe('');
    expect(formatMinutesToHours(NaN, mockT)).toBe('');
  });

  it('formats only minutes (less than an hour)', () => {
    expect(formatMinutesToHours(30, mockT)).toBe('30 хв');
    expect(formatMinutesToHours(45, mockT)).toBe('45 хв');
    expect(formatMinutesToHours(1, mockT)).toBe('1 хв');
    expect(formatMinutesToHours(59, mockT)).toBe('59 хв');
  });

  it('formats only hours (without remaining minutes)', () => {
    expect(formatMinutesToHours(60, mockT)).toBe('1 год');
    expect(formatMinutesToHours(120, mockT)).toBe('2 год');
    expect(formatMinutesToHours(180, mockT)).toBe('3 год');
  });

  it('formats hours and minutes together', () => {
    expect(formatMinutesToHours(65, mockT)).toBe('1 год 5 хв');
    expect(formatMinutesToHours(90, mockT)).toBe('1 год 30 хв');
    expect(formatMinutesToHours(125, mockT)).toBe('2 год 5 хв');
    expect(formatMinutesToHours(195, mockT)).toBe('3 год 15 хв');
  });

  it('uses correct translations from t function', () => {
    const customT = (key: KeysTime): string => {
      const translations: Time = {
        h: 'hours',
        min: 'minutes',
      };

      return translations[key] || key;
    };

    expect(formatMinutesToHours(65, customT)).toBe('1 hours 5 minutes');
    expect(formatMinutesToHours(120, customT)).toBe('2 hours');
    expect(formatMinutesToHours(30, customT)).toBe('30 minutes');
  });
});
