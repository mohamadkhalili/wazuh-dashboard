/*
 * Copyright Wazuh
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  appendIconComponentCache as appendEuiIconComponentCache,
  TYPES as EUI_ICON_TYPES,
} from '@elastic/eui/lib/eui_components/icon/icon';
import {
  appendIconComponentCache as appendOuiIconComponentCache,
  TYPES as OUI_ICON_TYPES,
} from '@elastic/eui/lib/components/icon/icon';

type FontAwesomeSvgProps = React.SVGProps<SVGSVGElement> & {
  title?: string;
  titleId?: string;
  'data-icon-type'?: string;
};

type IconRule = readonly [pattern: RegExp, glyph: string];

const GLYPHS = {
  accessibility: '\uf29a',
  areaChart: '\uf1fe',
  arrowDown: '\uf175',
  arrowLeft: '\uf177',
  arrowRight: '\uf178',
  arrowUp: '\uf176',
  bars: '\uf0c9',
  bell: '\uf0a2',
  binoculars: '\uf1e5',
  book: '\uf02d',
  bug: '\uf188',
  bullseye: '\uf140',
  calendar: '\uf133',
  check: '\uf046',
  circle: '\uf10c',
  clipboard: '\uf0ea',
  clock: '\uf017',
  close: '\uf00d',
  cloud: '\uf0c2',
  cloudDownload: '\uf0ed',
  cloudUpload: '\uf0ee',
  code: '\uf121',
  compass: '\uf14e',
  compress: '\uf066',
  copy: '\uf24d',
  cubes: '\uf1b3',
  database: '\uf1c0',
  edit: '\uf044',
  envelope: '\uf0e0',
  eraser: '\uf12d',
  expand: '\uf065',
  externalLink: '\uf08e',
  eye: '\uf06e',
  eyeClosed: '\uf070',
  fileText: '\uf0f6',
  filter: '\uf0b0',
  flag: '\uf11d',
  folder: '\uf114',
  folderOpen: '\uf115',
  github: '\uf09b',
  globe: '\uf0ac',
  google: '\uf1a0',
  graduation: '\uf19d',
  heart: '\uf08a',
  heartbeat: '\uf21e',
  history: '\uf1da',
  home: '\uf015',
  info: '\uf129',
  keyboard: '\uf11c',
  lineChart: '\uf201',
  link: '\uf0c1',
  list: '\uf022',
  lock: '\uf023',
  magic: '\uf0d0',
  map: '\uf278',
  mapMarker: '\uf124',
  menuDown: '\uf103',
  menuLeft: '\uf100',
  menuRight: '\uf101',
  menuUp: '\uf102',
  microchip: '\uf2db',
  minus: '\uf147',
  moon: '\uf186',
  paintBrush: '\uf1fc',
  paperclip: '\uf0c6',
  pause: '\uf28c',
  percent: '\uf295',
  pieChart: '\uf200',
  pin: '\uf276',
  play: '\uf01d',
  plug: '\uf1e6',
  plus: '\uf196',
  power: '\uf011',
  question: '\uf29c',
  quote: '\uf10d',
  refresh: '\uf01e',
  rocket: '\uf135',
  save: '\uf0c7',
  scissors: '\uf0c4',
  server: '\uf233',
  share: '\uf1e0',
  shield: '\uf132',
  sliders: '\uf1de',
  smile: '\uf118',
  snowflake: '\uf2dc',
  sort: '\uf160',
  star: '\uf006',
  stats: '\uf080',
  stop: '\uf28e',
  sun: '\uf185',
  table: '\uf0ce',
  tag: '\uf02c',
  terminal: '\uf120',
  thumbsDown: '\uf088',
  thumbsUp: '\uf087',
  times: '\uf05c',
  trash: '\uf014',
  treeLine: '\uf0e8',
  unlock: '\uf13e',
  user: '\uf21b',
  users: '\uf0c0',
  warning: '\uf06a',
  wifi: '\uf1eb',
  windows: '\uf17a',
  wrench: '\uf0ad',
} as const;

/**
 * Rules are ordered from specific controls to broader application categories.
 * This keeps directional and destructive controls predictable while still
 * providing a Font Awesome fallback for every named EUI/OUI icon.
 */
const ICON_RULES: readonly IconRule[] = [
  [/navclose/, GLYPHS.close],
  [/navtreeline|treeline/, GLYPHS.bars],
  [/sitemap|branch/, GLYPHS.treeLine],
  [/arrowleft|frameprevious|editorundo/, GLYPHS.arrowLeft],
  [/arrowright|framenext|editorredo|returnkey/, GLYPHS.arrowRight],
  [/arrowup|continuityabove/, GLYPHS.arrowUp],
  [/arrowdown|continuitybelow/, GLYPHS.arrowDown],
  [/menuleft|sortleft|dockedleft/, GLYPHS.menuLeft],
  [/menuright|sortright|dockedright/, GLYPHS.menuRight],
  [/menuup|sortup|dockedtop/, GLYPHS.menuUp],
  [/menudown|sortdown|dockedbottom/, GLYPHS.menuDown],
  [/magnifywithplus|searchprofiler/, '\uf00e'],
  [/magnifywithminus/, '\uf010'],
  [/cross|exit|close|undeploy|indexclose/, GLYPHS.times],
  [/trash|delete|remove/, GLYPHS.trash],
  [/minus/, GLYPHS.minus],
  [/plus|add|create|new/, GLYPHS.plus],
  [/check|success|online|foldercheck/, GLYPHS.check],
  [/exclamation|danger|error|stopslash|folderexclamation/, GLYPHS.warning],
  [/question|help/, GLYPHS.question],
  [/info|iinCircle/i, GLYPHS.info],
  [/refresh|redeploy/, GLYPHS.refresh],
  [/download|export/, GLYPHS.cloudDownload],
  [/upload|import/, GLYPHS.cloudUpload],
  [/copy|clipboard/, GLYPHS.copy],
  [/unlink/, GLYPHS.times],
  [/link|symlink/, GLYPHS.link],
  [/pencil|edit/, GLYPHS.edit],
  [/save/, GLYPHS.save],
  [/eyeclosed|offline/, GLYPHS.eyeClosed],
  [/eye|glasses/, GLYPHS.eye],
  [/lockopen/, GLYPHS.unlock],
  [/lock/, GLYPHS.lock],
  [/fullscreenexit|minimize|fold/, GLYPHS.compress],
  [/fullscreen|expand|unfold/, GLYPHS.expand],
  [/play/, GLYPHS.play],
  [/pause/, GLYPHS.pause],
  [/stop/, GLYPHS.stop],
  [/power/, GLYPHS.power],
  [/share|popout/, GLYPHS.share],
  [/pin/, GLYPHS.pin],
  [/star/, GLYPHS.star],
  [/heart|cheer/, GLYPHS.heart],
  [/thumbsup|facehappy/, GLYPHS.thumbsUp],
  [/thumbsdown|facesad/, GLYPHS.thumbsDown],
  [/faceneutral/, GLYPHS.smile],
  [/calendar/, GLYPHS.calendar],
  [/clock/, GLYPHS.clock],
  [/recent|history|timeline|timeslider/, GLYPHS.history],
  [/filter/, GLYPHS.filter],
  [/sortable|sort/, GLYPHS.sort],
  [/tableofcontents|list/, GLYPHS.list],
  [/grid|boxes/, GLYPHS.table],
  [/menu/, GLYPHS.bars],
  [/tag/, GLYPHS.tag],
  [/flag/, GLYPHS.flag],
  [/paperclip/, GLYPHS.paperclip],
  [/folderopen/, GLYPHS.folderOpen],
  [/folder/, GLYPHS.folder],
  [/document|file|savedobject/, GLYPHS.fileText],
  [/quote/, GLYPHS.quote],
  [/percent/, GLYPHS.percent],
  [/currency|number/, GLYPHS.stats],
  [/color|brush|swatch/, GLYPHS.paintBrush],
  [/eraser/, GLYPHS.eraser],
  [/cut/, GLYPHS.scissors],
  [/wrench/, GLYPHS.wrench],
  [/accessibility/, GLYPHS.accessibility],
  [/keyboard/, GLYPHS.keyboard],
  [/mobile/, '\uf10b'],
  [/moon/, GLYPHS.moon],
  [/cloudsunny/, GLYPHS.sun],
  [/cloud|snowflake/, GLYPHS.cloud],
  [/temperature/, '\uf2c9'],
  [/mapmarker|radius|crosshairs/, GLYPHS.mapMarker],
  [/bullseye|radar/, GLYPHS.bullseye],
  [/rocket/, GLYPHS.rocket],
  [/training/, GLYPHS.graduation],
  [/bug/, GLYPHS.bug],
  [/bolt|pulse/, GLYPHS.heartbeat],
  [/magnet/, '\uf076'],
  [/memory|compute/, GLYPHS.microchip],
  [/wifi|signal/, GLYPHS.wifi],

  [/logogithub/, GLYPHS.github],
  [/logogmail/, GLYPHS.envelope],
  [/logogoogle/, GLYPHS.google],
  [/logowindows/, GLYPHS.windows],
  [/logoslack/, '\uf198'],
  [/logoaws|logoazure|logogcp|logocloud/, GLYPHS.cloud],
  [/logodocker|logokubernetes|logoelasticstack/, GLYPHS.cubes],
  [/logomysql|logomongodb|logopostgres|logoredis|logocouchbase/, GLYPHS.database],
  [/logocode|logogolang|logophp|logocodesandbox/, GLYPHS.code],
  [/logoapache|logonginx|logohttp|logohaproxy/, GLYPHS.server],
  [/logokafka|logorabbit|logowebhook/, GLYPHS.plug],
  [/logo/, GLYPHS.globe],

  [/security|threat|detection|audit/, GLYPHS.shield],
  [/visarea/, GLYPHS.areaChart],
  [/vispie/, GLYPHS.pieChart],
  [/visline|linechart/, GLYPHS.lineChart],
  [/visbar|stats|wsanalytics|businessanalytics/, GLYPHS.stats],
  [/vistable/, GLYPHS.table],
  [/visgauge|visgoal|metric/, '\uf0e4'],
  [/vismap|navmaps|mapsapp|gis/, GLYPHS.map],
  [/visual|canvas/, GLYPHS.areaChart],

  [/management|settings|administration|gear|controls/, GLYPHS.sliders],
  [/dashboard|overview|workspace/, '\uf0e4'],
  [/discover|search|inspect/, GLYPHS.binoculars],
  [/devtool|console|code|sql|query|kql|eql|grok/, GLYPHS.terminal],
  [/machinelearning|anomaly|outlier|regression|classification|aiflow/, GLYPHS.magic],
  [/monitor|observability|apm|trace|service|slo|uptime|heartbeat/, GLYPHS.heartbeat],
  [/notebook|book|documentation/, GLYPHS.book],
  [/report/, GLYPHS.fileText],
  [/alert|notification|bell|watches/, GLYPHS.bell],
  [/index|database|data|storage|shard|pipeline|logstash|beat/, GLYPHS.database],
  [/users|roles/, GLYPHS.users],
  [/user|account/, GLYPHS.user],
  [/integration|package|apps|spaces|module/, GLYPHS.cubes],
  [/home/, GLYPHS.home],
  [/getstarted|compass/, GLYPHS.compass],
  [/email|chat|comment/, GLYPHS.envelope],
  [/globe|ip/, GLYPHS.globe],
  [/server|node|cluster/, GLYPHS.server],
  [/tokenboolean/, GLYPHS.check],
  [/tokendate/, GLYPHS.calendar],
  [/tokengeo|tokenshape/, GLYPHS.mapMarker],
  [/tokenfile|tokenrepo|tokenpackage/, GLYPHS.folder],
  [/tokenstring|tokentext/, GLYPHS.quote],
  [/tokenarray|tokenobject|tokenstruct/, GLYPHS.cubes],
  [/token/, GLYPHS.code],
];

export const getFontAwesomeGlyph = (iconType: string): string => {
  const normalizedType = iconType.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
  const matchingRule = ICON_RULES.find(([pattern]) => pattern.test(normalizedType));
  return matchingRule?.[1] ?? GLYPHS.circle;
};

const createFontAwesomeSvgIcon = (iconType: string): React.ComponentType<FontAwesomeSvgProps> => {
  const FontAwesomeSvgIcon = ({
    title,
    titleId,
    'data-icon-type': semanticIconType,
    ...props
  }: FontAwesomeSvgProps): React.ReactElement => {
    const glyph = getFontAwesomeGlyph(semanticIconType ?? iconType);
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        aria-labelledby={titleId}
        {...props}
        data-icon-type={semanticIconType}
        data-wazuh-icon-theme="font-awesome"
        data-wazuh-original-icon={iconType}
      >
        {title ? <title id={titleId}>{title}</title> : null}
        <text
          x="8"
          y="12.75"
          fill="currentColor"
          fontFamily="FontAwesome"
          fontSize="13"
          fontWeight="normal"
          textAnchor="middle"
        >
          {glyph}
        </text>
      </svg>
    );
  };

  FontAwesomeSvgIcon.displayName = `WazuhFontAwesomeIcon(${iconType})`;
  return FontAwesomeSvgIcon;
};

let isGlobalIconThemeInstalled = false;

export const installGlobalIconTheme = (): void => {
  if (isGlobalIconThemeInstalled) {
    return;
  }

  const iconTypes = [...new Set([...EUI_ICON_TYPES, ...OUI_ICON_TYPES])];
  const iconComponentCache = iconTypes.reduce<Record<string, React.ComponentType<{}>>>(
    (cache, iconType) => {
      cache[iconType] = createFontAwesomeSvgIcon(iconType);
      return cache;
    },
    {}
  );

  appendEuiIconComponentCache(iconComponentCache);
  appendOuiIconComponentCache(iconComponentCache);
  isGlobalIconThemeInstalled = true;
};
