import { mount } from '@vue/test-utils';
import { describe, test, expect } from 'vitest';
import Intro from './index.vue';
import type Props from './index.type';

describe('Intro', () => {
  const createWrapper = (props: Props) => {
    return mount(Intro, { props });
  };

  test('displays title and description', () => {
    const wrapper = createWrapper({
      title: 'Test Title',
      description: 'Test component description',
    });

    expect(wrapper.find('[data-testid="intro-title"]').text()).toBe('Test Title');

    expect(wrapper.find('[data-testid="intro-description"]').text()).toBe(
      'Test component description'
    );
  });

  test('displays video when videoKey is provided', () => {
    const wrapper = createWrapper({
      title: 'Title with video',
      description: 'Description with video',
      videoKey: 'dQw4w9WgXcQ',
    });

    const video = wrapper.find('[data-testid="intro-video"]');
    const iframe = wrapper.find('iframe');

    expect(video.exists()).toBe(true);
    expect(iframe.exists()).toBe(true);
    expect(iframe.attributes('src')).toBe('https://www.youtube.com/embed/dQw4w9WgXcQ');
    expect(iframe.attributes('title')).toBe('YouTube video player');
  });

  test('does not display video when videoKey is not provided', () => {
    const wrapper = createWrapper({
      title: 'Title without video',
      description: 'Description without video',
    });

    const video = wrapper.find('[data-testid="intro-video"]');
    const iframe = wrapper.find('iframe');

    expect(video.exists()).toBe(false);
    expect(iframe.exists()).toBe(false);
  });
});
