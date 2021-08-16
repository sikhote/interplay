import { StyleSheet } from 'react-native';
import {
  c,
  spacing,
  bR,
  fS,
  lH,
} from 'lib/styling';

export default StyleSheet.create({
  root: {
    position: 'relative',
    padding: `0 ${spacing.e}px`,
    height: fS.c * lH.normal * 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: bR.a,
    backgroundColor: c.a,
  },
  rootIsSecondary: {
    backgroundColor: c.c,
  },
  rootIsSubtle: {
    backgroundColor: 'rgba(0, 0, 0, .3)',
  },
  rootIsLoading: {
    pointerEvents: 'none',
  },
  rootIsSmall: {
    height: fS.c * lH.normal * 1.125,
  },
  rootIsLarge: {
    height: fS.c * lH.normal * 2,
  },
  rootIsCircle: {
    borderRadius: bR.b,
    width: fS.c * lH.normal * 1.5,
  },
  rootIsSmallCircle: {
    width: fS.c * lH.normal * 1.125,
  },
  rootIsLargeCircle: {
    width: fS.c * lH.normal * 2,
  },
  rootIsNotEnclosed: {
    backgroundColor: 'none',
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
    color: c.white,
  },
  loadingIconIsLoading: {
    display: 'flex',
  },
  text: {
    color: c.white,
  },
});
