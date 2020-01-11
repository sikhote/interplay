import { spacing, bps } from '../../lib/styling';

export default {
  root: {
    width: '100%',
    height: '100%',
    display: 'grid',
    gridTemplateRows: 'auto 1fr',
  },
  header: {
    paddingTop: spacing.page,
    paddingLeft: spacing.page,
    paddingBottom: spacing.c,
    paddingRight: spacing.d,
    display: 'grid',
    gridTemplateColumns: '1fr auto',
    gridGap: spacing.d,
    [`@media (max-width: ${bps.b}px)`]: {
      padding: spacing.pageMobile,
      paddingBottom: spacing.c,
    },
  },
  h1: {
    paddingBottom: 0,
  },
  side: {
    display: 'grid',
    gridAutoColumns: 'auto',
    gridAutoFlow: 'column',
    gridGap: spacing.c,
  },
  search: {
    maxWidth: 240,
    [`@media (max-width: ${bps.b}px)`]: {
      maxWidth: 90,
    },
  },
  list: {
    overflow: 'hidden',
  },
};
