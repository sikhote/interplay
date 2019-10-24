import { spacing, zIndexes, colors, speeds } from '../../lib/styling';

export default {
  root: {
    zIndex: zIndexes.modifiers,
    position: 'absolute',
    top: 0,
    right: 0,
    background: 'rgba(255, 255, 255, 1)',
    height: '100%',
    borderTop: `1px solid ${colors.border}`,
    borderLeft: `1px solid ${colors.border}`,
    transition: `all ease ${speeds.a}s`,
    transform: 'translateX(100%)',
    width: 300,
    display: 'grid',
    gridTemplateRows: 'auto auto',
  },
  rootShow: {
    transform: 'translateX(0)',
  },
  selections: {
    borderBottom: `1px solid ${colors.border}`,
    maxHeight: 100,
    overflowY: 'auto',
  },
  selection: {
    padding: `${spacing.c}px ${spacing.d}px`,
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    '&:nth-of-type(even)': {
      background: 'rgba(0, 0, 0, 0.03)',
    },
  },
  optionsContainer: {
    overflowY: 'auto',
  },
  options: {
    display: 'grid',
    gridTemplateRows: 'auto',
    gridGap: spacing.f,
    gridAutoRows: 'auto',
    gridAutoFlow: 'row',
    alignContent: 'start',
    padding: spacing.page,
  },
};
