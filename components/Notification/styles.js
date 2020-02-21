import { transparentize } from 'polished';
import { colors, spacing, zIndexes } from '../../lib/styling';

export default {
  root: {
    position: 'fixed',
    left: 0,
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    flex: '0 0 auto',
    width: '100%',
    padding: `${spacing.d}px ${spacing.e}px`,
    background: transparentize(0, colors.white),
    borderBottom: `1px solid ${colors.border}`,
    zIndex: zIndexes.notification,
  },
  iconSuccess: {
    color: colors.a,
  },
  iconError: {
    color: colors.c,
  },
};
