import { StyleSheet } from 'react-native';
import { colors, spacing, zIndexes } from 'lib/styling';

export default () =>
  StyleSheet.create({
    item: {
      position: 'fixed',
      left: 0,
      width: '100%',
      flexWrap: 'wrap',
      alignItems: 'center',
      paddingTop: spacing.d,
    },
    itemInner: {
      padding: spacing.d,
      border: `1px solid ${colors.border}`,
      zIndex: zIndexes.notification,
      backgroundColor: colors.white,
      maxWidth: 300,
    },
    icon: {
      marginRight: spacing.c,
    },
    iconSuccess: {
      color: colors.a,
    },
    iconError: {
      color: colors.c,
    },
  });
