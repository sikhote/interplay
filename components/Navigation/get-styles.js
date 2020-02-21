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
    padding: `${spacing.e}px 0`,
    display: 'grid',
    gridAutoFlow: 'row',
    alignContent: 'start',
    ...(width < bps.b
      ? {
          gridAutoFlow: 'column',
          alignContent: 'stretch',
          padding: 0,
        }
      : {}),
  },
  item: {
    padding: `${spacing.d}px ${spacing.page}px`,
    textDecoration: 'none',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflowX: 'hidden',
    cursor: 'pointer',
    ...(width < bps.b
      ? {
          padding: `${spacing.d}px 0`,
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
