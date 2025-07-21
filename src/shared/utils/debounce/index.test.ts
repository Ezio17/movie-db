/* eslint-disable no-unused-vars */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import debounce from './index';

describe('debounce', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should call callback after specified delay', () => {
    const callback = vi.fn();
    const debouncedFn = debounce(callback, 100);

    debouncedFn('test');

    expect(callback).not.toHaveBeenCalled();

    vi.advanceTimersByTime(100);

    expect(callback).toHaveBeenCalledWith('test');
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should cancel previous call when new call is made', () => {
    const callback = vi.fn();
    const debouncedFn = debounce(callback, 100);

    debouncedFn('first');
    vi.advanceTimersByTime(50);

    debouncedFn('second');
    vi.advanceTimersByTime(50);

    expect(callback).not.toHaveBeenCalled();

    vi.advanceTimersByTime(50);

    expect(callback).toHaveBeenCalledWith('second');
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should call callback with latest arguments', () => {
    const callback = vi.fn();
    const debouncedFn = debounce(callback, 100);

    debouncedFn('arg1', 'arg2');
    debouncedFn('arg3', 'arg4');

    vi.advanceTimersByTime(100);

    expect(callback).toHaveBeenCalledWith('arg3', 'arg4');
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should work with different argument types', () => {
    const callback = vi.fn();
    const debouncedFn = debounce(callback, 100);

    debouncedFn(1, 'string', { key: 'value' }, true);

    vi.advanceTimersByTime(100);

    expect(callback).toHaveBeenCalledWith(1, 'string', { key: 'value' }, true);
  });

  it('should work without arguments', () => {
    const callback = vi.fn();
    const debouncedFn = debounce(callback, 100);

    debouncedFn();

    vi.advanceTimersByTime(100);

    expect(callback).toHaveBeenCalledWith();
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should handle multiple consecutive calls', () => {
    const callback = vi.fn();
    const debouncedFn = debounce(callback, 100);

    debouncedFn('call1');
    debouncedFn('call2');
    debouncedFn('call3');

    vi.advanceTimersByTime(100);

    expect(callback).toHaveBeenCalledWith('call3');
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should allow callback execution after delay completion', () => {
    const callback = vi.fn();
    const debouncedFn = debounce(callback, 100);

    debouncedFn('first');
    vi.advanceTimersByTime(100);

    expect(callback).toHaveBeenCalledWith('first');
    expect(callback).toHaveBeenCalledTimes(1);

    debouncedFn('second');
    vi.advanceTimersByTime(100);

    expect(callback).toHaveBeenCalledWith('second');
    expect(callback).toHaveBeenCalledTimes(2);
  });

  it('should work with different delay values', () => {
    const callback = vi.fn();
    const debouncedFn = debounce(callback, 250);

    debouncedFn('test');

    vi.advanceTimersByTime(200);
    expect(callback).not.toHaveBeenCalled();

    vi.advanceTimersByTime(50);
    expect(callback).toHaveBeenCalledWith('test');
  });

  it('should work with proper typing', () => {
    const stringCallback = vi.fn<(arg: string) => void>();
    const numberCallback = vi.fn<(arg1: number, arg2: number) => void>();

    const debouncedString = debounce(stringCallback, 100);
    const debouncedNumber = debounce(numberCallback, 100);

    debouncedString('test');
    debouncedNumber(1, 2);

    vi.advanceTimersByTime(100);

    expect(stringCallback).toHaveBeenCalledWith('test');
    expect(numberCallback).toHaveBeenCalledWith(1, 2);
  });
});
