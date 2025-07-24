import { describe, it, expect } from 'vitest';
import generateImagePath from './index';

describe('imageUrl utility', () => {
  it('should return correct URL for given width and path', () => {
    const width = 'w500';
    const path = '/abc123.jpg';
    const expected = 'https://image.tmdb.org/t/p/w500/abc123.jpg';

    expect(generateImagePath(width, path)).toBe(expected);
  });
});
