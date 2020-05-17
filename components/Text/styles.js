import { StyleSheet } from 'react-native';
import {
  colors,
  fontSizes,
  lineHeights,
  fontWeights,
  fontFamilies,
} from 'lib/styling';

export default StyleSheet.create({
  root: {
    fontSize: fontSizes.c,
    color: colors.text,
    fontWeight: fontWeights.normal,
    fontFamily: fontFamilies.normal,
    lineHeight: lineHeights.normal * fontSizes.c,
  },
});
