import { transparentize } from 'polished';
import { colors, spacing, bps } from '../../../lib/styling';

export default {
  root: {
    display: 'grid',
    gridGap: spacing.e,
    gridTemplateColumns: '40px 1fr 1fr 1fr',
    padding: `0 ${spacing.e}px`,
    alignItems: 'center',
    outline: 'none',
    cursor: 'pointer',
    '&:nth-of-type(even)': {
      background: 'rgba(0, 0, 0, 0.03)',
    },
    svg: {
      paddingLeft: spacing.b,
      width: 24,
      height: 24,
    },
    [`@media (max-width: ${bps.b}px)`]: {
      padding: `0 ${spacing.d}px`,
      gridTemplateColumns: '20px 1fr 1fr 1fr',
    },
  },
  rootHeader: {
    borderTop: `1px solid ${colors.border}`,
    borderBottom: `1px solid ${colors.border}`,
    background:
      'linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.08) 100%) !important',
  },
  rootVideo: {
    gridTemplateColumns: '1fr 1fr',
  },
  rootPlaylists: {
    gridTemplateColumns: '1fr 90px 60px',
    [`@media (max-width: ${bps.b}px)`]: {
      gridTemplateColumns: '1fr 80px 50px',
    },
  },
  rootActive: {
    background: `${transparentize(0.8, colors.a)} !important`,
  },
  rootSelected: {
    background: `${transparentize(0.8, colors.c)} !important`,
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
};
