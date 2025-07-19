/* eslint-disable no-unused-vars */
type Callback<T extends unknown[]> = (...args: T) => void;

const debounce = <T extends unknown[]>(callback: Callback<T>, delay: number) => {
  let timeoutTimer: ReturnType<typeof setTimeout>;

  return (...args: T) => {
    if (timeoutTimer) {
      clearTimeout(timeoutTimer);
    }

    timeoutTimer = setTimeout(() => {
      callback(...args);
    }, delay);
  };
};

export default debounce;
