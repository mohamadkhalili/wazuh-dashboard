/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { uiRenderMixin } from './ui_render_mixin';

// Mock dependencies
jest.mock('@osd/i18n', () => {
  const getRegisteredLocales = jest.fn();
  return {
    i18n: {
      getLocale: jest.fn(),
      getTranslation: jest.fn(),
      normalizeLocale: jest.fn((locale) => locale),
      translate: jest.fn((key, { defaultMessage }) => defaultMessage),
    },
    i18nLoader: {
      getRegisteredLocales: getRegisteredLocales,
      getTranslationsByLocale: jest.fn(),
      isRegisteredLocale: jest.fn((locale) => getRegisteredLocales()?.includes?.(locale)),
    },
  };
});

// Import mocked modules
const { i18n, i18nLoader } = require('@osd/i18n');

describe('uiRenderMixin', () => {
  let server;
  let osdServer;
  let config;
  let routes;
  let decorations;

  beforeEach(() => {
    routes = [];
    decorations = {};
    server = {
      route: jest.fn((route) => routes.push(route)),
      decorate: jest.fn((type, name, value) => {
        decorations[`${type}.${name}`] = value;
      }),
      auth: { settings: { default: false } },
    };
    osdServer = {
      newPlatform: {
        setup: {
          core: {
            http: { csp: { header: 'test-csp-header' } },
          },
        },
        start: {
          core: {
            savedObjects: {
              getScopedClient: jest.fn(),
            },
            uiSettings: {
              asScopedToClient: jest.fn(),
            },
          },
        },
        __internals: {
          rendering: {
            render: jest.fn(),
          },
        },
      },
    };
    config = {
      get: jest.fn(),
    };

    // Reset mocks
    jest.clearAllMocks();
  });

  describe('translations route', () => {
    let handler;
    let h;

    beforeEach(() => {
      i18n.getLocale.mockReturnValue('fa-IR');
      uiRenderMixin(osdServer, server, config);
      handler = routes.find((route) => route.path === '/translations/{locale}.json').handler;
      h = {
        response: jest.fn().mockReturnThis(),
        header: jest.fn().mockReturnThis(),
        etag: jest.fn().mockReturnThis(),
      };
    });

    it('should handle default locale', async () => {
      const defaultLocale = 'fa-IR';
      const defaultTranslations = { hello: 'سلام' };
      i18n.getTranslation.mockReturnValue(defaultTranslations);

      const request = { params: { locale: defaultLocale } };
      await handler(request, h);

      expect(i18n.getTranslation).toHaveBeenCalled();
      expect(h.response).toHaveBeenCalledWith({
        translations: defaultTranslations,
        warning: null,
      });
      expect(h.header).toHaveBeenCalledWith('cache-control', 'must-revalidate');
      expect(h.header).toHaveBeenCalledWith('content-type', 'application/json');
      expect(h.etag).toHaveBeenCalled();
    });

    it('falls back to Persian for a non-English registered locale', async () => {
      const defaultLocale = 'fa-IR';
      const requestedLocale = 'fr';
      const defaultTranslations = { hello: 'سلام' };
      i18n.getTranslation.mockReturnValue(defaultTranslations);
      i18nLoader.getRegisteredLocales.mockReturnValue([defaultLocale, requestedLocale]);

      const request = { params: { locale: requestedLocale } };
      await handler(request, h);

      expect(i18nLoader.getTranslationsByLocale).not.toHaveBeenCalled();
      expect(h.response).toHaveBeenCalledWith({
        translations: defaultTranslations,
        warning: {
          title: 'Unsupported Locale',
          text: `The requested locale "${requestedLocale}" is not supported. Falling back to ${defaultLocale}.`,
        },
      });
    });

    it('falls back to Persian translations for an unknown locale', async () => {
      const defaultLocale = 'fa-IR';
      const unknownLocale = 'xx';
      const defaultTranslations = { hello: 'سلام' };
      i18n.getTranslation.mockReturnValue(defaultTranslations);

      const request = { params: { locale: unknownLocale } };
      await handler(request, h);

      expect(i18nLoader.getTranslationsByLocale).not.toHaveBeenCalled();
      expect(h.response).toHaveBeenCalledWith({
        translations: defaultTranslations,
        warning: {
          title: 'Unsupported Locale',
          text: `The requested locale "${unknownLocale}" is not supported. Falling back to ${defaultLocale}.`,
        },
      });
      expect(h.header).toHaveBeenCalledWith('cache-control', 'must-revalidate');
      expect(h.header).toHaveBeenCalledWith('content-type', 'application/json');
      expect(h.etag).toHaveBeenCalled();
    });

    it('serves exact built-in English without requiring a registered locale', async () => {
      const englishTranslations = { messages: {} };
      i18n.getLocale.mockReturnValue('fa-IR');
      i18nLoader.getRegisteredLocales.mockReturnValue(['fa-IR']);
      i18nLoader.getTranslationsByLocale.mockResolvedValue(englishTranslations);

      uiRenderMixin(osdServer, server, config);
      const englishHandler = routes
        .filter((route) => route.path === '/translations/{locale}.json')
        .slice(-1)[0].handler;

      await englishHandler({ params: { locale: 'en' } }, h);

      expect(i18nLoader.getTranslationsByLocale).toHaveBeenCalledWith('en');
      expect(h.response).toHaveBeenCalledWith({
        translations: { messages: {}, locale: 'en' },
        warning: null,
      });
    });

    it('does not treat a normalized English variant as the exact en opt-in', async () => {
      const defaultTranslations = { hello: 'سلام' };
      i18n.normalizeLocale.mockReturnValue('en');
      i18n.getTranslation.mockReturnValue(defaultTranslations);

      await handler({ params: { locale: 'EN' } }, h);

      expect(i18nLoader.getTranslationsByLocale).not.toHaveBeenCalled();
      expect(h.response).toHaveBeenCalledWith({
        translations: defaultTranslations,
        warning: {
          title: 'Unsupported Locale',
          text: 'The requested locale "EN" is not supported. Falling back to fa-IR.',
        },
      });
    });

    it('should cache translations', async () => {
      const defaultLocale = 'fa-IR';
      const defaultTranslations = { hello: 'سلام' };
      i18n.getTranslation.mockReturnValue(defaultTranslations);

      const request = { params: { locale: defaultLocale } };
      await handler(request, h);
      await handler(request, h);

      expect(i18n.getTranslation).toHaveBeenCalledTimes(1);
    });

    it('should handle errors gracefully', async () => {
      const defaultLocale = 'fa-IR';
      i18n.getTranslation.mockImplementation(() => {
        throw new Error('Translation error');
      });
      i18nLoader.getRegisteredLocales.mockReturnValue([defaultLocale]);

      const request = { params: { locale: defaultLocale } };
      await expect(handler(request, h)).rejects.toThrow('Translation error');
    });
  });
});
