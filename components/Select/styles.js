const styles = {
  root: {
    position: 'relative',
    borderRadius: 2,
    border: '1px solid var(--c-border)',
    select: {
      outline: 'none',
      backgroundColor: 'white',
      padding: '0 6px',
      height: 15 * 1.4 * 1.5,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      fontSize: 'var(--fs-normal)',
      lineHeight: 'var(--lh-close)',
      color: 'var(--c-text)',
      border: 'none',
    },
  },
  rootWithIcon: {
    paddingLeft: 28,
  },
  icon: {
    position: 'absolute',
    top: 0,
    left: 8,
    height: '100%',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
  },
};

export default styles;
