import {
  colors,
  fontSizes,
  lineHeights,
  spacing,
  borderRadii,
} from '../../lib/styling';

export default {
  root: {
    background: colors.white,
    padding: `0 ${spacing.e}px`,
    height: fontSizes.c * lineHeights.normal * 2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: borderRadii.a,
    border: `1px solid ${colors.border}`,
    width: '100%',
    fontSize: fontSizes.c,
    lineHeight: lineHeights.close,
    color: colors.text,
  },
};
