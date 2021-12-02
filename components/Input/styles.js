const styles = {
  root: {
    position: 'relative',
  },
  icon: {
    position: 'absolute',
    top: 0,
    left: 10,
    height: '100%',
    pointerEvents: 'none',
    color: 'var(--c-text)',
  },
  iconIsSmall: {
    left: 4,
  },
  input: {
    '& > *': {
      backgroundColor: 'white',
      padding: '0 6px',
      height: 15 * 1.4 * 1.5,
      borderRadius: 2,
      border: '1px solid var(--c-border)',
      width: '100%',
      fontSize: 'var(--fs-normal)',
      lineHeight: 'var(--lh-close)',
      color: 'var(--c-text)',
    },
  },
  inputIsIcon: {
    '& > *': {
      paddingLeft: 34,
    },
  },
  inputIsIconIsSmall: {
    '& > *': {
      paddingLeft: 28,
    },
  },
  inputIsSmall: {
    '& > *': {
      height: 15 * 1.4 * 1.5,
      padding: '0 6px',
    },
  },
};

export default styles;
