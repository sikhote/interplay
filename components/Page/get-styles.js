import { StyleSheet } from 'react-native';
import { colors, bps } from '../../lib/styling';

export default ({ width }) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.background,
      display: 'grid',
      gridTemplateColumns: 'auto 1fr',
      gridTemplateRows: '1fr auto',
      gridTemplateAreas: '"navigation main" "player player"',
      height: '100vh',
      ...(width < bps.b
        ? {
            gridTemplateColumns: '1fr',
            gridTemplateRows: 'auto 1fr auto',
            gridTemplateAreas: '"navigation" "main" "player"',
          }
        : {}),
    },
    main: {
      overflowY: 'auto',
    },
    icon: {
      color: colors.a,
    },
    loading: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
    },
  });
