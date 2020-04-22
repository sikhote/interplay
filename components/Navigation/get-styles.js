import { transparentize } from 'polished';
import { colors, spacing, bps } from '../../lib/styling';

export default ({ width }) => ({
  root: {
    width: 240,
    background: colors.b,
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
    paddingVertical: spacing.e,
    display: 'grid',
    gridAutoFlow: 'row',
    alignContent: 'start',
    ...(width < bps.b
      ? {
          gridAutoFlow: 'column',
          alignContent: 'stretch',
          paddingVertical: 0,
        }
      : {}),
  },
  item: {
    paddingLeft: spacing.page,
    paddingRight: spacing.page,
    paddingTop: spacing.d,
    paddingBottom: spacing.d,
    textDecoration: 'none',
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
          background: transparentize(0.8, colors.white),
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
    color: colors.white,
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
