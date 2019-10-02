import { lighten } from 'polished';

export default {
  root: {
    background: 'rgba(0, 0, 0, 0.3)',
    '&:active': {
      background: lighten(0.1, 'rgba(0, 0, 0, 0.3)'),
    },
  },
};
