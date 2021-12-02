const styles = {
  global: {
    '*': {
      margin: 0,
      padding: 0,
      boxSizing: 'border-box',
    },
    ':root': {
      '--c-main': '#1890ff',
      '--c-main-dark': '#001529',
      '--c-alt': '#ff69b4',
      '--c-text': 'rgba(0, 0, 0, .8)',
      '--c-text-faded': 'rgba(0, 0, 0, 0.45)',
      '--c-border': '#d9d9d9',
      '--c-error': 'red',
      '--c-success': 'green',
      '--fs-small': '12px',
      '--fs-normal': '15px',
      '--fs-large': '20px',
      '--fs-huge': '29px',
      '--lh-normal': '1.4em',
      '--lh-close': '1em',
      '--ff-normal':
        '-apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      '--bps-a': '500px',
      '--bps-b': '768px',
      '--bps-c': '1024px',
      '--bps-d': '1200px',
      '--s-page': '32px',
      '--s-block': '16px',
      '--s-element': '6px',
      '@media (max-width: 768px)': {
        '--fs-large': '18px',
        '--fs-huge': '22px',
        '--s-page': '16px',
        '--s-block': '10px',
      },
    },
    body: {
      fontSize: 'var(--fs-normal)',
      color: 'var(--c-text)',
      fontWeight: '200',
      fontFamily: 'var(--ff-normal)',
      lineHeight: 'var(--lh-normal)',
    },
  },
  // container: {
  //   backgroundColor: c.background,
  //   display: 'grid',
  //   gridTemplateColumns: 'auto 1fr',
  //   gridTemplateRows: '1fr auto',
  //   gridTemplateAreas: '"navigation main" "player player"',
  //   height: '100vh',
  //   [`@media (max-width: ${bps.b - 1}px)`]: {
  //     gridTemplateColumns: '1fr',
  //     gridTemplateRows: 'auto 1fr auto',
  //     gridTemplateAreas: '"navigation" "main" "player"',
  //   },
  // },
  // main: {
  //   overflowY: 'auto',
  // },
  // icon: {
  //   color: c.a,
  // },
  // loading: {
  //   display: 'flex',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   height: '100vh',
  // },
};

export default styles;
