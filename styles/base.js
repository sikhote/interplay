/* eslint-disable max-len */

import { transparentize } from 'polished';

export const bps = {
  medium: 800,
};

export const spacing = {};
spacing.size1 = 2;
spacing.size2 = 4;
spacing.size3 = 8;
spacing.size4 = 16;
spacing.size5 = 24;
spacing.size6 = 32;
spacing.size7 = 48;
spacing.size8 = 72;

export const colors = {};
colors.blue = '#1890ff';
colors.darkBlue = '#001529';
colors.menu = colors.darkBlue;
colors.menuItemColor = 'rgba(255, 255, 255, .7)';
colors.menuItemActiveColor = 'rgba(255, 255, 255, 1)';
colors.menuItemBackgorund = colors.blue;
colors.menuItemDropBorder = transparentize(0.6, colors.blue);
colors.menuItemDroppingBackground = 'rgba(255, 255, 255, 0.1)';

export const fontSizes = {};
fontSizes.size1 = 'font-size: 12px;';
fontSizes.size2 = 'font-size: 14px;';
fontSizes.size3 = 'font-size: 16px;';
fontSizes.size4 = 'font-size: 20px;';
fontSizes.size5 = 'font-size: 24px;';
fontSizes.size6 = 'font-size: 28px;';
fontSizes.size7 = 'font-size: 30px;';
fontSizes.size8 = 'font-size: 36px;';
fontSizes.smallTitle = fontSizes.size1;
fontSizes.menuItemTitle = fontSizes.size2;

export const lineHeights = {
  normal: 'line-height: 1.4em;',
  close: 'line-height: 1em;',
};

export const fontFamilies = {
  sansSerif: `
    font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    ${lineHeights.normal}
  `,
};

export const borderRadii = {};
borderRadii.size1 = 'border-radius: 4px';
