import { spacing, bps } from '../../../lib/styling';

export default {
  root: {
    padding: spacing.page,
    [`@media (max-width: ${bps.b}px)`]: {
      padding: spacing.pageMobile,
    },
    maxWidth: 600,
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
};
