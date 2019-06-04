import { colors, bps } from '../../lib/styling';

export default {
  global: {
    '*': {
      margin: 0,
      padding: 0,
      boxSizing: 'border-box',
    },
    '.icon-play::before': {
      marginRight: 0,
    },
    '.icon-fast-forward::before': {
      marginRight: 0,
    },
  },
  container: {
    background: colors.background,
    display: 'grid',
    gridTemplateColumns: 'auto 1fr',
    gridTemplateRows: '1fr auto',
    gridTemplateAreas: `
      'navigation main'
      'player player'
    `,
    height: '100vh',
    [`@media (max-width: ${bps.a2}px)`]: {
      gridTemplateColumns: '1fr',
      gridTemplateRows: 'auto 1fr auto',
      gridTemplateAreas: `
        'navigation'
        'main'
        'player'
      `,
    },
  },
  main: {
    overflowY: 'auto',
  },
};
