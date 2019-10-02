import { spacing, bps } from '../../lib/styling';

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
    [`@media (max-width: '${bps.b}px)`]: {
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
    gridTemplateAreas: `"info directions sound" "info progress sound"`,
    alignItems: 'center',
    justifyItems: 'stretch',
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
  },
  divider: {
    display: 'none',
  },
  directions: {
    display: 'grid',
    gridAutoColumns: 'auto',
    gridAutoFlow: 'column',
    alignItems: 'center',
    gridArea: 'directions',
    gridGap: spacing.f,
    justifySelf: 'center',
  },
  buttons: {
    display: 'grid',
    gridAutoColumns: 'auto',
    gridAutoFlow: 'column',
    gridGap: spacing.d,
    alignItems: 'center',
  },
  sound: {
    display: 'grid',
    gridGap: spacing.e,
    gridArea: 'sound',
    gridTemplateColumns: 'auto 1fr',
    alignItems: 'center',
  },
  shuffleSound: {
    display: 'none',
  },
  loopSound: {
    display: 'none',
  },
  switches: {
    [`@media (max-width: '${bps.b}px)`]: {
      display: 'grid',
      gridGap: spacing.c,
      gridTemplateColumns: 'auto auto auto',
    },
  },
};

//   }
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
//

//   :global(.progress) {
//     grid-area: 'progress',
//   }
//   @media (max-width: '${bps.a2 - 1}px) {
//     .main {
//       grid-template-areas:
//         'sound sound'
//         'progress directions'
//         'info info'',
//       grid-template-columns: '1fr auto',
//       grid-template-rows: 'auto auto auto',
//       grid-column-gap: '${spacing.a5}px',
//       grid-row-gap: '${spacing.a5}px',
//     }
//     .directions {
//       grid-gap: '0',
//     }
//     .directions :global(.loop),
//     .directions :global(.shuffle) {
//       display: 'none',
//     }
//     .buttons {
//       grid-gap: '${spacing.a3}px',
//     }
//     .sound {
//       display: 'grid',
//       grid-gap: '${spacing.a5}px',
//       grid-area: 'sound',
//       grid-template-columns: 'auto 1fr',
//       align-items: 'center',
//     }
//     .sound :global(.loop),
//     .sound :global(.shuffle) {
//       display: 'block',
//     }
//
//     .info {
//       display: 'block',
//       text-overflow: 'ellipsis',
//       white-space: 'nowrap',
//       overflow: 'hidden',
//     }
//     :global(.name) {
//       font-weight: '${fontWeights.normal} !important',
//     }
//     :global(.divider) {
//       display: 'inline',
//     }
//   }
// `',
