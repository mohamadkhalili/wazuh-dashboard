import { resolveLocale, getDirection } from './locale.js';
import { translate as translateCommon } from './packs/common/index.js';
import { translate as translateDashboard } from './packs/dashboard/index.js';
import { translate as translateRtl } from './packs/rtl/index.js';
import { translate as translateSecurity } from './packs/security/index.js';
import { translate as translateWazuh } from './packs/wazuh/index.js';

export const WAZUH_FARSI_READY_EVENT = 'wazuh-farsi:ready';

const translators = Object.freeze({
  common: translateCommon,
  dashboard: translateDashboard,
  rtl: translateRtl,
  security: translateSecurity,
  wazuh: translateWazuh,
});

export function createWazuhFarsiBridge() {
  return Object.freeze({
    resolveLocale,
    getDirection,
    translate(pack, key, values, locale) {
      const translator = translators[pack];
      if (!translator) throw new Error(`Unknown wazuh-farsi pack: ${pack}`);
      return translator(key, values, locale);
    },
  });
}

export function installWazuhFarsiBridge(target) {
  if (!target) return undefined;
  const existing = target.WazuhFarsi;
  if (
    existing &&
    typeof existing.resolveLocale === 'function' &&
    typeof existing.getDirection === 'function' &&
    typeof existing.translate === 'function'
  ) {
    return existing;
  }

  const bridge = createWazuhFarsiBridge();
  target.WazuhFarsi = bridge;
  const CustomEventConstructor = target.CustomEvent ?? globalThis.CustomEvent;
  if (
    typeof target.dispatchEvent === 'function' &&
    typeof CustomEventConstructor === 'function'
  ) {
    target.dispatchEvent(
      new CustomEventConstructor(WAZUH_FARSI_READY_EVENT, { detail: bridge })
    );
  }
  return bridge;
}

if (typeof window !== 'undefined') {
  installWazuhFarsiBridge(window);
}
