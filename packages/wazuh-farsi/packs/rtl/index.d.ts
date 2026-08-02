import type { Locale, MessageDescriptor, MessageValues } from '../../types.js';

export type MessageKey = "antivirusTitle" | "appearance" | "development" | "howItWorks" | "loading" | "notifications";
export declare const packId: "rtl";
export declare const messages: Readonly<Record<MessageKey, MessageDescriptor>>;
export declare const osdMessages: Readonly<Record<string, string>>;
export declare const formats: Readonly<Record<string, unknown>>;
export declare function translate(key: MessageKey, values?: MessageValues | Locale, locale?: Locale): string;
export declare function variants(key: MessageKey): string[];
