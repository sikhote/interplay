import { StyleSheet } from 'react-native';
import {
  colors,
  fontSizes,
  lineHeights,
  spacing,
  borderRadii,
} from 'lib/styling';

export default StyleSheet.create({
  root: {
    position: 'relative',
  },
  icon: {
    position: 'absolute',
    top: 0,
    left: spacing.e,
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    color: colors.text,
  },
  iconIsSmall: {
    left: spacing.d,
  },
  input: {
    backgroundColor: colors.white,
    paddingHorizontal: spacing.e,
    height: fontSizes.c * lineHeights.normal * 1.5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: borderRadii.a,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: colors.border,
    width: '100%',
    fontSize: fontSizes.c,
    lineHeight: lineHeights.close,
    color: colors.text,
  },
  inputWithIcon: {
    paddingLeft: 46,
  },
  inputIsSmall: {
    height: fontSizes.c * lineHeights.normal * 1.5,
    padding: `0 ${spacing.d}px`,
  },
  inputWithIconIsSmall: {
    paddingLeft: 30,
  },
});
