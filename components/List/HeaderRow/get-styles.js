import { StyleSheet } from 'react-native';
import {
  c,
  spacing,
  bps,
  fS,
  lH,
  fontWeights,
} from 'lib/styling';

const buttonWidth = fS.c * lH.normal * 1.125;

export default ({ width }) =>
  StyleSheet.create({
    root: {
      display: 'grid',
      gridGap: spacing.e,
      gridTemplateColumns: `40px 1fr 1fr 1fr ${buttonWidth}px`,
      boxSizing: 'border-box',
      alignItems: 'center',
      cursor: 'pointer',
      borderTopWidth: 1,
      borderTopStyle: 'solid',
      borderTopColor: c.border,
      borderBottomWidth: 1,
      borderBottomStyle: 'solid',
      borderBottomColor: c.border,
      backgroundColor: 'rgba(0, 0, 0, 0.02)',
      overflowY: 'scroll',
      ...(width < bps.b
        ? {
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
      fontWeight: fW.bold,
      fontSize: fS.b,
    },
    icon: {
      color: c.text,
      fontSize: fS.a,
    },
  });
