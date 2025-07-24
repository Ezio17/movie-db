import type { KeysTime } from './index.type';

// eslint-disable-next-line no-unused-vars
function formatMinutesToHours(minutes: number, t: (key: KeysTime) => string): string {
  if (minutes <= 0 || Number.isNaN(minutes)) return '';

  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  const hoursStr = hours > 0 ? `${hours} ${t('h')}` : '';
  const minsStr = mins > 0 ? `${mins} ${t('min')}` : '';

  return [hoursStr, minsStr].filter(Boolean).join(' ');
}

export default formatMinutesToHours;
