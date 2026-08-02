/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useCallback, useMemo } from 'react';
import { Logos } from 'opensearch-dashboards/public';
import {
  EuiButtonEmpty,
  EuiFlexGroup,
  EuiFlexItem,
  EuiText,
  EuiIcon,
  EuiPanel,
  EuiSpacer,
} from '@elastic/eui';
import { translate as translateDashboard } from 'wazuh-farsi/packs/dashboard';
import { InternalApplicationStart } from 'src/core/public/application';
import { createEuiListItem } from './nav_link';
import { NavGroupItemInMap } from '../../nav_group';
import { ChromeNavLink } from '../../nav_links';
export interface CollapsibleNavTopProps {
  collapsibleNavHeaderRender?: () => JSX.Element | null;
  homeLink?: ChromeNavLink;
  currentNavGroup?: NavGroupItemInMap;
  navigateToApp: InternalApplicationStart['navigateToApp'];
  logos: Logos;
}

export const CollapsibleNavTop = ({
  collapsibleNavHeaderRender,
  currentNavGroup,
  navigateToApp,
  logos,
  homeLink,
}: CollapsibleNavTopProps) => {
  const homeIcon = logos.Mark.url;

  const homeLinkProps = useMemo(() => {
    if (homeLink) {
      const propsForHomeIcon = createEuiListItem({
        link: homeLink,
        appId: 'home',
        dataTestSubj: 'collapsibleNavHome',
        navigateToApp,
      });
      return {
        'data-test-subj': propsForHomeIcon['data-test-subj'],
        onClick: propsForHomeIcon.onClick,
      };
    }

    return {};
  }, [homeLink, navigateToApp]);

  const onIconClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      homeLinkProps.onClick?.(e);
    },
    [homeLinkProps]
  );

  return (
    <EuiPanel
      color="transparent"
      hasBorder={false}
      hasShadow={false}
      className="navGroupEnabledNavTopWrapper"
    >
      {/* The spacer here is used for align with the page header */}
      <EuiSpacer size="xs" />
      <EuiFlexGroup responsive={false}>
        <EuiFlexItem grow={false}>
          <EuiButtonEmpty
            flush="both"
            {...homeLinkProps}
            onClick={onIconClick}
            className="navGroupEnabledHomeIcon"
            aria-label={translateDashboard('goToHome')}
          >
            <EuiIcon
              type="menu"
              size="xl"
              data-icon-type="navTreeLine"
              data-test-subj={`collapsibleNavIcon-${homeIcon}`}
            />
          </EuiButtonEmpty>
        </EuiFlexItem>
      </EuiFlexGroup>
      {
        // Nav groups with type are system(global) nav group and we should show title for those nav groups
        (currentNavGroup?.type || collapsibleNavHeaderRender) && (
          <>
            <EuiSpacer />
            {currentNavGroup?.type ? (
              <EuiText size="s">
                <h3>{currentNavGroup.title}</h3>
              </EuiText>
            ) : (
              collapsibleNavHeaderRender?.()
            )}
          </>
        )
      }
    </EuiPanel>
  );
};
