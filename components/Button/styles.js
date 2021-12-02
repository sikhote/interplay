const styles = {
  root: {
    position: 'relative',
    padding: '0 6px',
    height: 15 * 1.4 * 1.5,
    borderRadius: 2,
    background: 'var(--c-main)',
    border: 'none',
    width: '100%',
    cursor: 'pointer',
    fontSize: 'inherit',
    color: 'white',
  },
  rootIsSecondary: {
    background: 'var(--c-alt)',
  },
  rootIsSubtle: {
    background: 'rgba(0, 0, 0, .3)',
  },
  rootIsLoading: {
    pointerEvents: 'none',
    cursor: 'default',
  },
  rootIsSmall: {
    height: 15 * 1.4 * 1.125,
  },
  rootIsLarge: {
    height: 15 * 1.4 * 2,
  },
  rootIsCircle: {
    borderRadius: '50%',
    width: 15 * 1.4 * 1.5,
  },
  rootIsSmallCircle: {
    width: 15 * 1.4 * 1.125,
  },
  rootIsLargeCircle: {
    width: 15 * 1.4 * 2,
  },
  rootIsNotEnclosed: {
    background: 'none',
    color: 'black',
  },
  iconIsNotEnclosedIsSubtle: {
    color: 'rgba(0, 0, 0, .4)',
  },
  children: {
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
  },
  childrenIsLoading: {
    opacity: 0,
  },
  iconWithChildren: {
    marginRight: 6,
  },
  loadingIcon: {
    display: 'none',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingIconIsLoading: {
    display: 'flex',
  },
};

export default styles;
