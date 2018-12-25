/* eslint-disable max-len */

import { darken, lighten } from 'polished';

export const spacing = {};
spacing.a1 = 0;
spacing.a2 = 2;
spacing.a3 = 4;
spacing.a4 = 8;
spacing.a5 = 16;
spacing.a6 = 24;
spacing.a7 = 32;
spacing.a8 = 48;
spacing.a9 = 72;
spacing.page = spacing.a7;
spacing.pageA2 = spacing.a5;

export const colors = {};
/* Colors colors.a1 = '#172115';
// colors.a2 = '#657a63';
// colors.a3 = '#30291d';
// colors.a4 = '#d8d8d8';
// colors.a1 = '#1890ff';
colors.a3 = '#ff69b4'; */
colors.a1 = '#1890ff';
colors.a2 = '#001529';
colors.a3 = '#ff69b4';
colors.transparent = 'transparent';
colors.white = 'white';
colors.black = 'black';
colors.inherit = 'inherit';
colors.text = 'rgba(0, 0, 0, .7)';
colors.border = '#d9d9d9';
colors.error = 'red';
colors.success = 'red';
colors.background = colors.a4;
colors.navigationItem = 'rgba(255, 255, 255, .4)';
colors.navigationItemActive = colors.white;
colors.textInputBg = darken(0.05, colors.a1);
colors.textInputPlaceholder = lighten(0.05, colors.a1);
colors.icon = colors.a4;
colors.modifiersBg = 'rgba(255, 255, 255, 1)';
colors.alternatingBg = 'rgba(0, 0, 0, 0.03)';

export const bps = {};
bps.a1 = 500;
bps.a2 = 800;
bps.a3 = 1000;
bps.a4 = 1200;

export const fontSizes = {};
fontSizes.a1 = 10;
fontSizes.a2 = 12;
fontSizes.a3 = 14;
fontSizes.a4 = 20;
fontSizes.a5 = 28;
fontSizes.h1 = fontSizes.a5;
fontSizes.h2 = fontSizes.a2;

export const lineHeights = {};
lineHeights.normal = '1.4em';
lineHeights.close = '1em';

export const fontFamilies = {};
fontFamilies.normal =
  '-apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';

export const fontWeights = {};
fontWeights.normal = '200';
fontWeights.bold = '600';

export const borderRadii = {};
borderRadii.a1 = 4;

export const zIndexes = {};
zIndexes.modifiers = 1;

export const speeds = {};
speeds.a1 = 0.1;
