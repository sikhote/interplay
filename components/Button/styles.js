import { StyleSheet } from 'react-native';
import {
  colors,
  spacing,
  borderRadii,
  fontSizes,
  lineHeights,
} from 'lib/styling';

export default StyleSheet.create({
  root: {
    position: 'relative',
    padding: `0 ${spacing.e}px`,
    height: fontSizes.c * lineHeights.normal * 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: borderRadii.a,
    backgroundColor: colors.a,
  },
  rootIsSecondary: {
    backgroundColor: colors.c,
  },
  rootIsSubtle: {
    backgroundColor: 'rgba(0, 0, 0, .3)',
  },
  rootIsSmall: {
    height: fontSizes.c * lineHeights.normal * 1.125,
  },
  rootIsLarge: {
    height: fontSizes.c * lineHeights.normal * 2,
  },
  rootIsCircle: {
    borderRadius: (fontSizes.c * lineHeights.normal * 1.5) / 2,
    width: fontSizes.c * lineHeights.normal * 1.5,
  },
  rootIsSmallCircle: {
    width: fontSizes.c * lineHeights.normal * 1.125,
  },
  rootIsLargeCircle: {
    width: fontSizes.c * lineHeights.normal * 2,
  },
  rootIsNotEnclosed: {
    backgroundColor: colors.transparent,
  },
  icon: {
    color: colors.white,
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
  text: {
    color: colors.white,
  },
});
