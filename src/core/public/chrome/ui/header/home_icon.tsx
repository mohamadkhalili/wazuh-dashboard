/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { EuiIcon, IconSize } from '@elastic/eui';
import { ChromeBranding } from '../../chrome_service';
import type { Logos } from '../../../../common/types';

interface Props {
  branding: ChromeBranding;
  logos: Logos;
}

/**
 * Use branding configurations to render the header mark on the nav bar.
 */
export const HomeIcon = ({ branding, logos }: Props) => {
  const { applicationTitle = 'Ayyza dashboard' } = branding;
  const { url: logoURL, type: logoType } = logos.Application;
  const testSubj = `${logoType}Logo`;
  const logoIconSize: IconSize = 'l';

  const alt = `${applicationTitle} home`;

  return (
    <EuiIcon
      data-test-subj={testSubj}
      data-test-image-url={logoURL}
      type={logoURL}
      title={alt}
      size={logoIconSize}
      className="logoImage"
    />
  );
};
