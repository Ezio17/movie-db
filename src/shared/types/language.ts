import uk from '@root/i18n/locales/uk.json';
import en from '@root/i18n/locales/en.json';
import es from '@root/i18n/locales/es.json';

type MessageUk = typeof uk;
type MessageEn = typeof en;
type MessageEs = typeof es;

type MessageSchema = MessageEn & MessageUk & MessageEs;

type Locales = 'uk' | 'en' | 'es';

export type { MessageSchema, Locales };
