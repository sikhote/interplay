import { StyleSheet, Platform } from 'react-native';
import { transparentize } from 'polished';
import { colors, spacing, bps } from 'lib/styling';

export default ({ width }) =>
  StyleSheet.create({
    root: {
      paddingHorizontal: spacing.e,
      boxSizing: 'border-box',
      alignItems: 'center',
      flexDirection: 'row',
      ...(Platform.OS === 'web'
        ? {
            cursor: 'pointer',
          }
        : {}),
    },
    rootOdd: {
      backgroundColor: 'rgba(0, 0, 0, 0.03)',
    },
    rootActive: {
      backgroundColor: transparentize(0.8, colors.a),
    },
    inner: {
      flex: 1,
      display: 'flex',
      flexDirection: 'row',
      boxSizing: 'border-box',
      alignItems: 'center',
      ...(Platform.OS === 'web'
        ? {
            cursor: 'pointer',
          }
        : {}),
      ...(width < bps.b
        ? {
            paddingHorizontal: spacing.d,
          }
        : {}),
    },
    column: {
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
    },
    columnGap: {
      width: spacing.e,
    },
  });
