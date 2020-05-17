import { StyleSheet } from 'react-native';
import { spacing, fontSizes, lineHeights } from 'lib/styling';

export default StyleSheet.create({
  root: {
    display: 'flex',
    paddingBottom: spacing.e,
    fontSize: fontSizes.h1,
    lineHeight: lineHeights.close * fontSizes.h1,
  },
});
