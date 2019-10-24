import { spacing, bps, fontWeights } from '../../lib/styling';

export default {
  root: {
    padding: `${spacing.e}px ${spacing.page}px`,
    background: `linear-gradient(
      to top,
      transparent 50%,
      rgba(0, 0, 0, 0.1) 100%
    )`,
    borderTop: '1px solid rgba(0, 0, 0, 0.15)',
    display: 'grid',
    gridTemplateColumns: '0px 1fr',
    gridArea: 'player',
    [`@media (max-width: ${bps.b}px)`]: {
      padding: spacing.pageMobile,
    },
  },
  player: {
    overflow: 'hidden',
    cursor: 'pointer',
    background: 'black',
  },
  main: {
    display: 'grid',
    gridColumnGap: spacing.i,
    gridRowGap: spacing.e,
    gridTemplateColumns: '0.7fr 1fr 0.7fr',
    gridTemplateRows: 'auto auto',
    gridTemplateAreas: '"info directions sound" "info progress sound"',
    alignItems: 'center',
    justifyItems: 'stretch',
    [`@media (max-width: ${bps.b}px)`]: {
      gridTemplateAreas: '"sound sound" "progress directions" "info info"',
      gridTemplateColumns: '1fr auto',
      gridTemplateRows: 'auto auto auto',
      gridColumnGap: spacing.e,
      gridRowGap: spacing.e,
    },
  },
  info: {
    gridArea: 'info',
    width: '100%',
    display: 'grid',
    gridTemplateRows: '1fr',
    gridAutoFlow: 'row',
    '& > *': {
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
    },
    [`@media (max-width: ${bps.b}px)`]: {
      display: 'block',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
    },
  },
  name: {
    [`@media (max-width: ${bps.b}px)`]: {
      fontWeight: fontWeights.normal,
    },
  },
  divider: {
    display: 'none',
    [`@media (max-width: ${bps.b}px)`]: {
      display: 'inline',
    },
  },
  directions: {
    display: 'grid',
    gridAutoColumns: 'auto',
    gridAutoFlow: 'column',
    alignItems: 'center',
    gridArea: 'directions',
    gridGap: spacing.f,
    justifySelf: 'center',
    [`@media (max-width: ${bps.b}px)`]: {
      gridGap: 0,
    },
  },
  buttons: {
    display: 'grid',
    gridAutoColumns: 'auto',
    gridAutoFlow: 'column',
    gridGap: spacing.d,
    alignItems: 'center',
    [`@media (max-width: ${bps.b}px)`]: {
      gridGap: spacing.c,
    },
  },
  sound: {
    display: 'grid',
    gridGap: spacing.e,
    gridArea: 'sound',
    gridTemplateColumns: 'auto 1fr',
    alignItems: 'center',
  },
  shuffleSound: {
    [`@media (min-width: ${bps.b + 1}px)`]: {
      display: 'none',
    },
  },
  loopSound: {
    [`@media (min-width: ${bps.b + 1}px)`]: {
      display: 'none',
    },
  },
  shuffleDirections: {
    [`@media (max-width: ${bps.b}px)`]: {
      display: 'none',
    },
  },
  loopDirections: {
    [`@media (max-width: ${bps.b}px)`]: {
      display: 'none',
    },
  },
  switches: {
    [`@media (max-width: ${bps.b}px)`]: {
      display: 'grid',
      gridGap: spacing.c,
      gridTemplateColumns: 'auto auto auto',
    },
  },
  progress: {
    gridArea: 'progress',
  },
};

//   .video {
//     grid-gap: '${spacing.a5}px',
//     grid-template-columns: '120px 1fr',
//   }
//   .video.is-full-screen :global(.player) {
//     position: 'fixed',
//     top: '0',
//     left: '0',
//     z-index: '9',
//     width: '100% !important',
//     height: '100% !important',
//     text-align: 'center',
//     max-width: '100%',
//   }
//   :global(.player video) {
//     object-fit: 'contain',
//     width: '100% !important',
//     height: '100% !important',
//   }
