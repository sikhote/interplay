import { spacing } from '../../lib/styling';

export default {
  root: {
    maxWidth: 400,
    '& > div:nth-of-type(n + 2)': {
      marginTop: spacing.c,
    },
  },
};
