import {
  colors,
  spacing,
  borderRadii,
  fontSizes,
  lineHeights,
} from '../../lib/styling';

export default {
  root: {
    position: 'relative',
    padding: `0 ${spacing.e}px`,
    height: fontSizes.c * lineHeights.normal * 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: borderRadii.a,
    background: colors.a,
  },
  rootIsSecondary: {
    background: colors.c,
  },
  rootIsSubtle: {
    background: 'rgba(0, 0, 0, .3)',
  },
  rootIsLoading: {
    pointerEvents: 'none',
  },
  rootIsSmall: {
    height: fontSizes.c * lineHeights.normal * 1.125,
  },
  rootIsLarge: {
    height: fontSizes.c * lineHeights.normal * 2,
  },
  rootIsCircle: {
    borderRadius: borderRadii.b,
    width: fontSizes.c * lineHeights.normal * 1.5,
  },
  rootIsSmallCircle: {
    width: fontSizes.c * lineHeights.normal * 1.125,
  },
  rootIsLargeCircle: {
    width: fontSizes.c * lineHeights.normal * 2,
  },
  rootIsNotEnclosed: {
    background: 'none',
  },
  iconIsNotEnclosedIsSubtle: {
    color: 'rgba(0, 0, 0, .4)',
  },
  childrenIsLoading: {
    opacity: 0,
  },
  iconWithChildren: {
    marginRight: spacing.c,
  },
  loadingIcon: {
    display: 'none',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    color: colors.white,
  },
  loadingIconIsLoading: {
    display: 'flex',
  },
};
