import { spacing, bps } from 'lib/styling';

const getStyles = ({ width }) => ({
  root: {
    width: '100%',
    height: '100%',
    display: 'grid',
    gridTemplateRows: 'auto 1fr',
    overflow: 'hidden',
  },
  header: {
    paddingTop: spacing.page,
    paddingLeft: spacing.page,
    paddingBottom: spacing.c,
    paddingRight: spacing.d,
    display: 'grid',
    gridTemplateColumns: '1fr auto',
    gridGap: spacing.d,
    ...(width < bps.b
      ? {
          padding: spacing.pageMobile,
          paddingBottom: spacing.c,
        }
      : {}),
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
    ...(width < bps.b
      ? {
          maxWidth: 90,
        }
      : {}),
  },
  table: {
    display: 'grid',
    gridTemplateRows: 'auto 1fr',
  },
  items: {
    overflowY: 'scroll',
  },
});

export default getStyles;
