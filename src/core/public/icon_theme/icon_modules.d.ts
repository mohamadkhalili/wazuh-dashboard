/*
 * Copyright Wazuh
 * SPDX-License-Identifier: Apache-2.0
 */

declare module '@elastic/eui/lib/eui_components/icon/icon' {
  import type { ComponentType } from 'react';

  export const TYPES: string[];
  export function appendIconComponentCache(
    iconTypeToIconComponentMap: Record<string, ComponentType<{}>>
  ): void;
}

declare module '@elastic/eui/lib/components/icon/icon' {
  import type { ComponentType } from 'react';

  export const TYPES: string[];
  export function appendIconComponentCache(
    iconTypeToIconComponentMap: Record<string, ComponentType<{}>>
  ): void;
}
