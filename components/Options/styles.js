import { StyleSheet } from 'react-native';
import { spacing, zIndexes, colors, speeds } from '../../lib/styling';

export default StyleSheet.create({
  root: {
    zIndex: zIndexes.options,
    position: 'fixed',
    top: 0,
    right: 0,
    height: '100%',
    width: '100%',
    transition: `all ease ${speeds.a}s`,
    transform: 'translateX(100%)',
    flexDirection: 'row',
  },
  rootShow: {
    transform: 'translateX(0)',
  },
  close: {
    flexGrow: 1,
    height: '100%',
    width: '100px',
  },
  inner: {
    flex: '0 0 auto',
    backgroundColor: 'rgba(255, 255, 255, 1)',
    borderLeftWidth: 1,
    borderLeftStyle: 'solid',
    borderLeftColor: colors.border,
    width: 300,
    height: '100%',
    display: 'grid',
    gridTemplateRows: 'auto',
    gridGap: spacing.f,
    gridAutoRows: 'auto',
    gridAutoFlow: 'row',
    alignContent: 'start',
    padding: spacing.page,
  },
  inputAndButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputAndButtonInput: {
    marginRight: spacing.c,
    flexGrow: 1,
  },
  moveUpAndDown: {
    flexDirection: 'row',
  },
  moveButtonLeft: {
    flexGrow: 1,
    marginRight: spacing.b,
    width: '50%',
  },
  moveButtonRight: {
    flexGrow: 1,
    marginLeft: spacing.b,
    width: '50%',
  },
});
