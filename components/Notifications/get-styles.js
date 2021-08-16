import { StyleSheet } from 'react-native';
import { c, spacing, zIndexes } from 'lib/styling';

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
      border: `1px solid ${c.border}`,
      zIndex: zI.notification,
      backgroundColor: c.white,
      maxWidth: 300,
    },
    icon: {
      marginRight: spacing.c,
    },
    iconSuccess: {
      color: c.a,
    },
    iconError: {
      color: c.c,
    },
  });
