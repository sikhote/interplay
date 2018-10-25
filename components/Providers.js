import React from 'react';
import PropTypes from 'prop-types';
import { throttle, get } from 'lodash';
import { Provider as ReduxProvider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import { IntlProvider, addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import { isBrowser, getLocale } from 'parlor';
import makeStore from '../lib/makeStore';
import { Dimensions } from './rnw';
import { translations } from '../lib/localization';
import DimensionsContext from './DimensionsContext';
import { cloudGet } from '../actions/cloud';

if (isBrowser) {
  addLocaleData(en);
}

const throttledOnDimensionsChange = throttle(callback => callback(), 1000, {
  trailing: true,
});

class Providers extends React.PureComponent {
  static getInitialProps = async ({ ctx }) => ({
    reqLocale: get(ctx, 'req.locale'),
  });
  state = {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  };
  componentDidMount() {
    Dimensions.addEventListener('change', () => this.onDimensionsChange());
    this.tryCloudGet();
  }
  componentWillUnmount() {
    Dimensions.removeEventListener('change', () => this.onDimensionsChange());
  }
  onDimensionsChange() {
    throttledOnDimensionsChange(() => {
      const { height, width } = Dimensions.get('window');
      this.setState({ height, width });
    });
  }
  tryCloudGet() {
    const {
      store: { dispatch, getState },
    } = this.props;
    const {
      cloud: { hasCloudStore },
      settings: {
        cloud: { key, path },
      },
    } = getState();

    if (!hasCloudStore && key && path) {
      dispatch(cloudGet());
    }
  }
  render() {
    const { children, store, reqLocale } = this.props;
    const { height, width } = this.state;
    const locale = reqLocale || getLocale();
    const messages = translations[locale];
    const now = Date.now();

    return (
      <ReduxProvider store={store}>
        <IntlProvider
          locale={locale}
          messages={messages}
          initialNow={now}
          textComponent={React.Fragment}
        >
          <DimensionsContext.Provider value={{ height, width }}>
            {children}
          </DimensionsContext.Provider>
        </IntlProvider>
      </ReduxProvider>
    );
  }
}

Providers.propTypes = {
  children: PropTypes.any,
  store: PropTypes.object.isRequired,
  reqLocale: PropTypes.string,
};

Providers.defaultProps = {
  children: null,
  reqLocale: undefined,
};

export default withRedux(makeStore)(Providers);
