export type Locale = 'fa-IR' | 'en';
export type MessageValues = Record<string, unknown>;
export interface MessageDescriptor { en: string; 'fa-IR': string; aliases?: Partial<Record<Locale, readonly string[]>>; }
