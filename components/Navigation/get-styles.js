import { StyleSheet } from 'react-native';
import { transparentize } from 'polished';
import { c, spacing, bps } from 'lib/styling';

export default ({ width }) =>
  StyleSheet.create({
    root: {
      width: 240,
      backgroundColor: c.b,
      overflowY: 'auto',
      height: '100%',
      gridArea: 'navigation',
      ...(width < bps.b
        ? {
            width: '100%',
          }
        : {}),
    },
    inner: {
      display: 'grid',
      gridAutoFlow: 'row',
      alignContent: 'start',
      ...(width < bps.b
        ? {
            gridAutoFlow: 'column',
            alignContent: 'stretch',
          }
        : {}),
    },
    item: {
      paddingLeft: spacing.page,
      paddingRight: spacing.page,
      paddingTop: spacing.d,
      paddingBottom: spacing.d,
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      overflowX: 'hidden',
      cursor: 'pointer',
      ...(width < bps.b
        ? {
            paddingLeft: 0,
            paddingRight: 0,
            textAlign: 'center',
          }
        : {}),
    },
    itemActive: {
      ...(width < bps.b
        ? {
            backgroundColor: transparentize(0.8, c.white),
          }
        : {}),
    },
    itemText: {
      color: 'rgba(255, 255, 255, .4)',
      ...(width < bps.b
        ? {
            textAlign: 'center',
          }
        : {}),
    },
    itemTextActive: {
      color: c.white,
    },
    itemTextIcon: {
      marginRight: spacing.e,
      ...(width < bps.b
        ? {
            marginRight: 0,
          }
        : {}),
    },
    itemTextContent: {
      ...(width < bps.b
        ? {
            display: 'none',
          }
        : {}),
    },
    itemPlaylist: {
      ...(width < bps.b
        ? {
            display: 'none',
          }
        : {}),
    },
  });
