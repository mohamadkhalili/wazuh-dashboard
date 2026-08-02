/*
 * Copyright Wazuh
 * SPDX-License-Identifier: Apache-2.0
 */

jest.mock('@elastic/eui/lib/eui_components/icon/icon', () => ({
  TYPES: ['search', 'dashboardApp'],
  appendIconComponentCache: jest.fn(),
}));

jest.mock('@elastic/eui/lib/components/icon/icon', () => ({
  TYPES: ['search'],
  appendIconComponentCache: jest.fn(),
}));

import { appendIconComponentCache as appendEuiIconComponentCache } from '@elastic/eui/lib/eui_components/icon/icon';
import { appendIconComponentCache as appendOuiIconComponentCache } from '@elastic/eui/lib/components/icon/icon';
import { getFontAwesomeGlyph, installGlobalIconTheme } from './global_icon_theme';

describe('global icon theme', () => {
  it.each([
    ['arrowLeft', '\uf177'],
    ['plusInCircle', '\uf196'],
    ['trash', '\uf014'],
    ['dashboardApp', '\uf0e4'],
    ['securityAnalyticsApp', '\uf132'],
    ['visPie', '\uf200'],
    ['logoGithub', '\uf09b'],
    ['tokenDate', '\uf133'],
    ['navTreeLine', '\uf0c9'],
    ['navClose', '\uf00d'],
    ['home', '\uf015'],
    ['compass', '\uf14e'],
  ])('maps %s to a semantic Font Awesome replacement', (iconType, expectedGlyph) => {
    expect(getFontAwesomeGlyph(iconType)).toBe(expectedGlyph);
  });

  it('uses a consistent replacement for an unknown icon', () => {
    expect(getFontAwesomeGlyph('unclassifiedGlyph')).toBe('\uf10c');
  });

  it('installs a deduplicated replacement cache for EUI and OUI once', () => {
    installGlobalIconTheme();
    installGlobalIconTheme();

    const euiCache = (appendEuiIconComponentCache as jest.MockedFunction<
      typeof appendEuiIconComponentCache
    >).mock.calls[0][0];
    const ouiCache = (appendOuiIconComponentCache as jest.MockedFunction<
      typeof appendOuiIconComponentCache
    >).mock.calls[0][0];

    expect(Object.keys(euiCache)).toEqual(['search', 'dashboardApp']);
    expect(ouiCache).toBe(euiCache);
    expect(appendEuiIconComponentCache).toHaveBeenCalledTimes(1);
    expect(appendOuiIconComponentCache).toHaveBeenCalledTimes(1);
  });
});
