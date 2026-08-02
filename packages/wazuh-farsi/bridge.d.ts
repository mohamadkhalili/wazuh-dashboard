import type { Locale, MessageValues } from './types.js';

export type WazuhFarsiPack = 'common' | 'dashboard' | 'rtl' | 'security' | 'wazuh';
export interface WazuhFarsiBridge {
  resolveLocale(input?: unknown): Locale;
  getDirection(input?: unknown): 'rtl' | 'ltr';
  translate(pack: WazuhFarsiPack, key: string, values?: MessageValues | Locale, locale?: Locale): string;
}
export interface WazuhFarsiWindow {
  WazuhFarsi?: WazuhFarsiBridge;
  CustomEvent?: typeof CustomEvent;
  dispatchEvent?(event: Event): boolean;
}
export declare const WAZUH_FARSI_READY_EVENT: 'wazuh-farsi:ready';
export declare function createWazuhFarsiBridge(): WazuhFarsiBridge;
export declare function installWazuhFarsiBridge(target?: WazuhFarsiWindow): WazuhFarsiBridge | undefined;
