import { darken, lighten } from 'polished';

const colors = {};
colors.a1 = '#172115';
colors.a2 = '#657a63';
colors.a3 = '#30291d';
colors.a4 = '#d8d8d8';
colors.transparent = 'transparent';
colors.white = 'white';
colors.black = 'black';
colors.text = colors.a4;
colors.border = 'red';
colors.error = 'red';
colors.success = 'red';
colors.background = colors.a1;
colors.navigationBg = darken(0.09, colors.a1);
colors.navigationItem = colors.a2;
colors.navigationItemActive = colors.a4;
colors.h1 = colors.white;
colors.h2 = colors.white;
colors.textInputBg = darken(0.05, colors.a1);
colors.textInputPlaceholder = lighten(0.05, colors.a1);
colors.icon = colors.a4;

export default colors;
