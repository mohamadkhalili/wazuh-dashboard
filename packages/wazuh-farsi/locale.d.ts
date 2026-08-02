export type Locale = 'fa-IR' | 'en';
export declare const DEFAULT_LOCALE: 'fa-IR';
export declare const ENGLISH_LOCALE: 'en';
export declare function resolveLocale(input?: unknown): Locale;
export declare function getDirection(input?: unknown): 'rtl' | 'ltr';
export declare function preserveLocaleInUrl(url: string, input?: unknown): string;
