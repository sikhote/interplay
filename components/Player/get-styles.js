import { StyleSheet, Platform } from 'react-native';
import { spacing, bps, fontWeights } from 'lib/styling';

export default ({ width }) => ({
  player: {
    overflow: 'hidden',
    ...(Platform.OS === 'web'
      ? {
          cursor: 'pointer',
        }
      : {}),
    backgroundColor: 'black',
  },
  styles: StyleSheet.create({
    root: {
      paddingHorizontal: spacing.page,
      paddingVertical: spacing.e,
      borderTopWidth: 1,
      borderTopStyle: 'solid',
      borderTopColor: 'rgba(0, 0, 0, 0.15)',
      display: 'grid',
      gridTemplateColumns: '0px 1fr',
      gridArea: 'player',
      ...(width < bps.c
        ? {
            paddingHorizontal: spacing.pageMobile,
            paddingVertical: spacing.pageMobile,
          }
        : {}),
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
      ...(width < bps.c
        ? {
            gridTemplateAreas:
              '"sound sound" "progress directions" "info info"',
            gridTemplateColumns: '1fr auto',
            gridTemplateRows: 'auto auto auto',
            gridColumnGap: spacing.e,
            gridRowGap: spacing.e,
          }
        : {}),
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
      ...(width < bps.c
        ? {
            display: 'block',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
          }
        : {}),
    },
    name: {
      fontWeight: fontWeights.bold,
      ...(width < bps.c
        ? {
            fontWeight: fontWeights.normal,
          }
        : {}),
    },
    divider: {
      display: 'none',
      ...(width < bps.c
        ? {
            display: 'inline',
          }
        : {}),
    },
    directions: {
      display: 'grid',
      gridAutoColumns: 'auto',
      gridAutoFlow: 'column',
      alignItems: 'center',
      gridArea: 'directions',
      gridGap: spacing.f,
      justifySelf: 'center',
      ...(width < bps.b
        ? {
            gridGap: 0,
          }
        : {}),
    },
    buttons: {
      display: 'grid',
      gridAutoColumns: 'auto',
      gridAutoFlow: 'column',
      gridGap: spacing.d,
      alignItems: 'center',
      ...(width < bps.b
        ? {
            gridGap: spacing.c,
          }
        : {}),
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
      ...(width < bps.b
        ? {
            display: 'flex',
          }
        : {}),
    },
    loopSound: {
      display: 'none',
      ...(width < bps.b
        ? {
            display: 'flex',
          }
        : {}),
    },
    shuffleDirections: {
      ...(width < bps.b
        ? {
            display: 'none',
          }
        : {}),
    },
    loopDirections: {
      ...(width < bps.b
        ? {
            display: 'none',
          }
        : {}),
    },
    switches: {
      ...(width < bps.b
        ? {
            display: 'grid',
            gridGap: spacing.c,
            gridTemplateColumns: 'auto auto auto',
          }
        : {}),
    },
    progress: {
      gridArea: 'progress',
    },
  }),
});

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
