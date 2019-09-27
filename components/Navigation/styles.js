import { transparentize } from 'polished';
import { colors, spacing, bps } from '../../lib/styling';

export default {
  root: {
    width: 240,
    background: colors.b,
    overflowY: 'auto',
    height: '100%',
    gridArea: 'navigation',
    [`@media (max-width: ${bps.b}px)`]: {
      width: '100%',
    },
  },
  inner: {
    padding: `${spacing.e}px 0`,
    display: 'grid',
    gridAutoFlow: 'row',
    alignContent: 'start',
    [`@media (max-width: ${bps.b}px)`]: {
      gridAutoFlow: 'column',
      alignContent: 'stretch',
      padding: 0,
    },
  },
  item: {
    padding: `${spacing.d}px ${spacing.page}px`,
    textDecoration: 'none',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflowX: 'hidden',
    cursor: 'pointer',
    [`@media (max-width: ${bps.b}px)`]: {
      padding: `${spacing.d}px 0`,
    },
  },
  itemActive: {
    [`@media (max-width: ${bps.b}px)`]: {
      background: transparentize(0.8, colors.white),
    },
  },
  itemText: {
    color: 'rgba(255, 255, 255, .4)',
    [`@media (max-width: ${bps.b}px)`]: {
      textAlign: 'center',
    },
  },
  itemTextActive: {
    color: colors.white,
  },
  itemTextIcon: {
    marginRight: spacing.e,
  },
  itemTextContent: {
    [`@media (max-width: ${bps.b}px)`]: {
      display: 'none',
    },
  },
  itemPlaylist: {
    [`@media (max-width: ${bps.b}px)`]: {
      display: 'none',
    },
  },
};
