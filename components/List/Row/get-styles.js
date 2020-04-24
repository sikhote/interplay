import { transparentize } from 'polished';
import {
  colors,
  spacing,
  bps,
  fontSizes,
  lineHeights,
} from '../../../lib/styling';

const buttonWidth = fontSizes.c * lineHeights.normal * 1.125;

export default ({ width }) => ({
  root: {
    display: 'grid',
    gridGap: spacing.e,
    gridTemplateColumns: `40px 1fr 1fr 1fr ${buttonWidth}px`,
    paddingHorizontal: spacing.e,
    boxSizing: 'border-box',
    alignItems: 'center',
    outline: 'none',
    cursor: 'pointer',
    ...(width < bps.b
      ? {
          paddingHorizontal: spacing.d,
          gridTemplateColumns: `20px 1fr 1fr 1fr ${buttonWidth}px`,
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
    overflowY: 'scroll',
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
