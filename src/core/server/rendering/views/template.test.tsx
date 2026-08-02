/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { load } from 'cheerio';
import { renderToStaticMarkup } from 'react-dom/server';
import { injectedMetadataServiceMock } from '../../../public/mocks';
import { httpServiceMock } from '../../http/http_service.mock';
import { Template } from './template';
import { renderWithIntl } from 'test_utils/enzyme_helpers';

const http = httpServiceMock.createStartContract();
const injectedMetadata = injectedMetadataServiceMock.createSetupContract();

function mockProps(locale = 'fa-IR') {
  return {
    uiPublicUrl: `${http.basePath}/ui`,
    locale,
    darkMode: true,
    themeVersion: 'v7',
    bootstrapScriptUrl: `${http.basePath}/bootstrap.js`,
    strictCsp: true,
    injectedMetadata: {
      version: injectedMetadata.getOpenSearchDashboardsVersion(),
      buildNumber: 1,
      branch: injectedMetadata.getBasePath(),
      wazuhVersion: injectedMetadata.getWazuhVersion(),
      basePath: '',
      serverBasePath: '',
      env: {
        packageInfo: {
          version: '',
          branch: '',
          buildNum: 1,
          buildSha: '',
          dist: true,
          wazuhVersion: '',
        },
        mode: {
          name: 'production' as 'development' | 'production',
          dev: true,
          prod: false,
        },
      },
      anonymousStatusPage: injectedMetadata.getAnonymousStatusPage(),
      i18n: { translationsUrl: '' },
      csp: injectedMetadata.getCspConfig(),
      vars: injectedMetadata.getInjectedVars(),
      uiPlugins: injectedMetadata.getPlugins(),
      legacyMetadata: {
        uiSettings: {
          defaults: { legacyInjectedUiSettingDefaults: true },
          user: {},
        },
      },
      branding: injectedMetadata.getBranding(),
      survey: injectedMetadata.getSurvey(),
    },
  };
}

describe('Loading page ', () => {
  beforeEach(() => {
    injectedMetadata.getBranding.mockReturnValue({});
  });

  describe('locale', () => {
    it('renders Persian and RTL by default with the Persian runtime', () => {
      const dom = load(renderToStaticMarkup(<Template metadata={mockProps()} />));

      expect(dom('html').attr('lang')).toBe('fa-IR');
      expect(dom('html').attr('dir')).toBe('rtl');
      expect(dom('script[src*="farsi-runtime-bootstrap.js"]')).toHaveLength(1);
      expect(dom('#osd_loading_message .osdWelcomeText').text()).toBe('در حال بارگذاری ...');
    });

    it('renders English and LTR only for exact locale=en', () => {
      const dom = load(renderToStaticMarkup(<Template metadata={mockProps('en')} />));

      expect(dom('html').attr('lang')).toBe('en');
      expect(dom('html').attr('dir')).toBe('ltr');
      expect(dom('script[src*="farsi-runtime-bootstrap.js"]')).toHaveLength(0);
      expect(dom('#osd_loading_message .osdWelcomeText').text()).toBe('Loading ...');
    });

    it('falls back to Persian for invalid locale values', () => {
      const dom = load(renderToStaticMarkup(<Template metadata={mockProps('EN')} />));

      expect(dom('html').attr('lang')).toBe('fa-IR');
      expect(dom('html').attr('dir')).toBe('rtl');
      expect(dom('script[src*="farsi-runtime-bootstrap.js"]')).toHaveLength(1);
    });
  });

  describe('logo in default mode ', () => {
    it('rendered using loading logo default mode URL', () => {
      const branding = {
        darkMode: false,
        logo: {},
        mark: { defaultUrl: '/defaultModeMark' },
        loadingLogo: { defaultUrl: 'defaultModeLoadingLogo/' },
        applicationTitle: 'custom title',
      };
      injectedMetadata.getBranding.mockReturnValue(branding);
      const component = renderWithIntl(<Template metadata={mockProps()} />);
      expect(component).toMatchSnapshot();
    });

    it('rendered using mark default mode URL with horizontal loading bar', () => {
      const branding = {
        darkMode: false,
        logo: {},
        mark: { defaultUrl: '/defaultModeMark' },
        loadingLogo: {},
        applicationTitle: 'custom title',
      };
      injectedMetadata.getBranding.mockReturnValue(branding);
      const component = renderWithIntl(<Template metadata={mockProps()} />);
      expect(component).toMatchSnapshot();
    });

    it('rendered using the original OpenSearch loading logo spinner', () => {
      const branding = {
        darkMode: false,
        logo: {},
        mark: {},
        loadingLogo: {},
        applicationTitle: 'custom title',
      };
      injectedMetadata.getBranding.mockReturnValue(branding);
      const component = renderWithIntl(<Template metadata={mockProps()} />);
      expect(component).toMatchSnapshot();
    });
  });

  describe('logo in dark mode ', () => {
    it('rendered using loading logo dark mode URL', () => {
      const branding = {
        darkMode: false,
        logo: {},
        mark: { defaultUrl: '/defaultModeMark', darkModeUrl: '/darkModeMark' },
        loadingLogo: { defaultUrl: '/defaultModeLoadingLogo', darkModeUrl: '/darkModeLoadingLogo' },
        title: 'custom title',
      };
      injectedMetadata.getBranding.mockReturnValue(branding);
      const component = renderWithIntl(<Template metadata={mockProps()} />);
      expect(component).toMatchSnapshot();
    });

    it('rendered using loading logo default mode URL', () => {
      const branding = {
        darkMode: false,
        logo: {},
        mark: { defaultUrl: '/defaultModeMark', darkModeUrl: '/darkModeMark' },
        loadingLogo: { defaultUrl: '/defaultModeLoadingLogo' },
        title: 'custom title',
      };
      injectedMetadata.getBranding.mockReturnValue(branding);
      const component = renderWithIntl(<Template metadata={mockProps()} />);
      expect(component).toMatchSnapshot();
    });

    it('rendered using mark dark mode URL with loading bar', () => {
      const branding = {
        darkMode: false,
        logo: {},
        mark: { defaultUrl: '/defaultModeMark', darkModeUrl: '/darkModeMark' },
        loadingLogo: {},
        title: 'custom title',
      };
      injectedMetadata.getBranding.mockReturnValue(branding);
      const component = renderWithIntl(<Template metadata={mockProps()} />);
      expect(component).toMatchSnapshot();
    });

    it('rendered using mark default mode URL with loading bar', () => {
      const branding = {
        darkMode: false,
        logo: {},
        mark: { defaultUrl: '/defaultModeMark' },
        loadingLogo: {},
        title: 'custom title',
      };
      injectedMetadata.getBranding.mockReturnValue(branding);
      const component = renderWithIntl(<Template metadata={mockProps()} />);
      expect(component).toMatchSnapshot();
    });

    it('renders using original opensearch loading spinner', () => {
      const branding = {
        darkMode: false,
        logo: {},
        mark: {},
        loadingLogo: {},
        title: 'custom title',
      };
      injectedMetadata.getBranding.mockReturnValue(branding);
      const component = renderWithIntl(<Template metadata={mockProps()} />);
      expect(component).toMatchSnapshot();
    });
  });
  describe('render favicon ', () => {
    it('using a valid URL', () => {
      const branding = {
        darkMode: false,
        logo: {},
        mark: {},
        loadingLogo: {},
        faviconUrl: '/customFavicon',
        title: 'custom title',
      };
      injectedMetadata.getBranding.mockReturnValue(branding);
      const component = renderWithIntl(<Template metadata={mockProps()} />);
      expect(component).toMatchSnapshot();
    });

    it('using an invalid URL', () => {
      const branding = {
        darkMode: false,
        logo: {},
        mark: {},
        loadingLogo: {},
        title: 'custom title',
      };
      injectedMetadata.getBranding.mockReturnValue(branding);
      const component = renderWithIntl(<Template metadata={mockProps()} />);
      expect(component).toMatchSnapshot();
    });
  });
});
