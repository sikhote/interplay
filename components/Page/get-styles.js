import { colors, bps } from '../../lib/styling';

export default ({ width }) => ({
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
    gridTemplateAreas: '"navigation main" "player player"',
    height: '100vh',
    ...(width < bps.b
      ? {
          gridTemplateColumns: '1fr',
          gridTemplateRows: 'auto 1fr auto',
          gridTemplateAreas: '"navigation" "main" "player"',
        }
      : {}),
  },
  main: {
    overflowY: 'auto',
  },
  icon: {
    color: colors.a,
  },
  loading: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  },
});
