import { borderRadii, spacing } from '../../../lib/styling';

export default {
  container: {
    borderRadius: borderRadii.a1,
    padding: spacing.a5,
  },
  loading: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
};
