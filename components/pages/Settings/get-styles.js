import { spacing, bps } from '../../../lib/styling';

export default ({ width }) => ({
  root: {
    padding: spacing.page,
    maxWidth: 600,
    ...(width < bps.b
      ? {
          padding: spacing.pageMobile,
        }
      : {}),
  },
  inputs: {
    marginTop: spacing.e,
  },
  sync: {
    marginTop: spacing.c,
    maxWidth: 400,
  },
  statuses: {
    marginTop: spacing.e,
  },
  statusLine: {
    display: 'flex',
  },
});
