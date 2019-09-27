import { spacing, bps } from '../../../lib/styling';

export default {
  root: {
    padding: spacing.page,
    [`@media (max-width: ${bps.b}px)`]: {
      padding: spacing.pageMobile,
    },
  },
  inputs: {
    marginTop: spacing.e,
    maxWidth: 400,
    '& > div:nth-of-type(n + 2)': {
      marginTop: spacing.c,
    },
  },
  statuses: {
    marginTop: spacing.e,
  },
  statusLine: {
    display: 'flex',
  },
  icons: {
    marginTop: spacing.e,
    display: 'grid',
    gridAutoFlow: 'column',
    gridAutoColumns: 'auto',
    justifyContent: 'start',
    gridGap: spacing.c,
  },
};
