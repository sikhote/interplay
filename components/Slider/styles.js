import { borderRadii, colors } from '../../lib/styling';

export default {
  root: {
    position: 'relative',
    height: 20,
    cursor: 'pointer',
  },
  rail: {
    height: 4,
    borderRadius: borderRadii.b,
    position: 'absolute',
    top: '50%',
    marginTop: -2,
    left: 0,
    width: '100%',
  },
  slider: {
    position: 'absolute',
    zIndex: 1,
    width: 20,
    height: 20,
    borderRadius: borderRadii.b,
    background: colors.white,
    top: 0,
    boxShadow: 'rgba(0, 0, 0, 0.5) 0px 1px 3px',
  },
};
