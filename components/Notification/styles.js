import { transparentize } from 'polished';
import { keyframes } from '@emotion/core';
import { colors, spacing, zIndexes } from '../../lib/styling';

const slideInAndOut = keyframes({
  '0%': {
    top: -999,
  },
  '20%': {
    top: 0,
  },
  '80%': {
    top: 0,
  },
  '100%': {
    top: -999,
  },
});

export default {
  root: {
    position: 'fixed',
    top: -999,
    left: 0,
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    flex: '0 0 auto',
    width: '100%',
    animation: `${slideInAndOut} 3s`,
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
