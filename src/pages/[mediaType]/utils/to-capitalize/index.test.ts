import { describe, expect, it } from 'vitest';
import toCapitalize from './index';

describe('toCapitalize', () => {
  it('Function call without arguments', () => {
    expect(toCapitalize('')).toBe('');
  });

  it('Correct function call', () => {
    expect(toCapitalize('test')).toBe('Test');
  });
});
