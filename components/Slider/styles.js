import { StyleSheet, Platform } from 'react-native';
import { colors } from 'lib/styling';

export default StyleSheet.create({
  root: {
    position: 'relative',
    height: 20,
    ...(Platform.OS === 'web'
      ? {
          cursor: 'pointer',
        }
      : {}),
  },
  rail: {
    height: 4,
    borderRadius: 2,
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
    paddingRight: 20,
  },
  handle: {
    position: 'relative',
    zIndex: 1,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.white,
    top: 0,
    ...(Platform.OS === 'web'
      ? {
          boxShadow: 'rgba(0, 0, 0, 0.5) 0px 1px 3px',
        }
      : {
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.18,
          shadowRadius: 1,
          elevation: 1,
        }),
  },
});
