import { transparentize } from 'polished';
import { colors, spacing, bps } from '../../../lib/styling';

export default ({ width }) => ({
  root: {
    display: 'grid',
    gridGap: spacing.e,
    gridTemplateColumns: '40px 1fr 1fr 1fr',
    paddingHorizontal: spacing.e,
    boxSizing: 'border-box',
    alignItems: 'center',
    outline: 'none',
    cursor: 'pointer',
    ...(width < bps.b
      ? {
          paddingHorizontal: spacing.d,
          gridTemplateColumns: '20px 1fr 1fr 1fr',
        }
      : {}),
  },
  rootOdd: {
    background: 'rgba(0, 0, 0, 0.03)',
  },
  rootHeader: {
    borderTop: `1px solid ${colors.border}`,
    borderBottom: `1px solid ${colors.border}`,
    background:
      'linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.08) 100%)',
  },
  rootVideo: {
    gridTemplateColumns: '1fr 1fr',
  },
  rootRecent: {
    gridTemplateColumns: '160px 1fr 1fr 1fr',
  },
  rootPlaylists: {
    gridTemplateColumns: '1fr 90px 60px',
    ...(width < bps.b
      ? {
          gridTemplateColumns: '1fr 80px 50px',
        }
      : {}),
  },
  rootActive: {
    background: `${transparentize(0.8, colors.a)}`,
  },
  column: {
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    outline: 'none',
  },
  columnHeader: {
    display: 'grid',
    gridTemplateColumns: 'auto auto',
    justifyContent: 'start',
    alignItems: 'center',
    height: 26,
  },
});
