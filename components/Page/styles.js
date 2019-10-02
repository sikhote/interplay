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
    '.icon-loop::before': {
      marginBottom: '.3em',
    },
    '.icon-shuffle::before': {
      marginBottom: '.2em',
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
    [`@media (max-width: ${bps.b}px)`]: {
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
