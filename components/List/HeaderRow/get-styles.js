import { StyleSheet } from 'react-native';
import {
  colors,
  spacing,
  bps,
  fontSizes,
  lineHeights,
  fontWeights,
} from 'lib/styling';

const buttonWidth = fontSizes.c * lineHeights.normal * 1.125;

export default ({ width }) =>
  StyleSheet.create({
    root: {
      display: 'grid',
      gridGap: spacing.e,
      gridTemplateColumns: `40px 1fr 1fr 1fr ${buttonWidth}px`,
      paddingHorizontal: spacing.e,
      boxSizing: 'border-box',
      alignItems: 'center',
      cursor: 'pointer',
      borderTopWidth: 1,
      borderTopStyle: 'solid',
      borderTopColor: colors.border,
      borderBottomWidth: 1,
      borderBottomStyle: 'solid',
      borderBottomColor: colors.border,
      backgroundColor: 'rgba(0, 0, 0, 0.02)',
      overflowY: 'scroll',
      ...(width < bps.b
        ? {
            paddingHorizontal: spacing.d,
            gridTemplateColumns: `20px 1fr 1fr 1fr ${buttonWidth}px`,
          }
        : {}),
    },
    rootVideo: {
      gridTemplateColumns: `1fr 1fr ${buttonWidth}px`,
    },
    rootRecent: {
      gridTemplateColumns: `160px 1fr 1fr 1fr ${buttonWidth}px`,
    },
    rootPlaylists: {
      gridTemplateColumns: `1fr 90px 60px ${buttonWidth}px`,
      ...(width < bps.b
        ? {
            gridTemplateColumns: `1fr 80px 50px ${buttonWidth}px`,
          }
        : {}),
    },
    column: {
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      display: 'grid',
      gridTemplateColumns: 'auto auto',
      justifyContent: 'start',
      alignItems: 'center',
      height: 26,
      fontWeight: fontWeights.bold,
      fontSize: fontSizes.b,
    },
    icon: {
      color: colors.text,
      fontSize: fontSizes.a,
    },
  });
