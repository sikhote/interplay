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
    height: fontSizes.c * lineHeights.normal * 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: borderRadii.a,
  },
  rootIsPrimary: {
    background: colors.a,
  },
  rootIsSecondary: {
    background: colors.c,
  },
  rootIsLoading: {
    pointerEvents: 'none',
  },
  rootIsSmall: {
    height: fontSizes.c * lineHeights.normal * 1.5,
  },
  rootIsCircle: {
    borderRadius: borderRadii.b,
    width: fontSizes.c * lineHeights.normal * 2,
  },
  rootIsSmallCircle: {
    width: fontSizes.c * lineHeights.normal * 1.5,
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
