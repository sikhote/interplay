import { StyleSheet } from 'react-native';
import { borderRadii, colors } from 'lib/styling';

export default StyleSheet.create({
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
  handleContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    paddingRight: 20,
  },
  handle: {
    position: 'relative',
    zIndex: 1,
    width: 20,
    height: 20,
    borderRadius: borderRadii.b,
    backgroundColor: colors.white,
    top: 0,
    boxShadow: 'rgba(0, 0, 0, 0.5) 0px 1px 3px',
  },
});
