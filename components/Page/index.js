import React from 'react';
import PropTypes from 'prop-types';
import { Provider as ReduxProvider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import makeStore from '../../lib/makeStore';
import { cloudGet } from '../../actions/cloud';
import Navigation from '../Navigation';
import Player from '../Player';
import styles from './styles';

class Page extends React.PureComponent {
  componentDidMount() {
    this.tryCloudGet();
  }

  tryCloudGet() {
    const {
      store: { dispatch, getState },
    } = this.props;
    const {
      settings: {
        cloud: { key, path, isConnected },
      },
    } = getState();

    if (!isConnected && key && path) {
      dispatch(cloudGet());
    }
  }

  render() {
    const { children, store } = this.props;

    return (
      <ReduxProvider store={store}>
        <div className="container">
          <style jsx>{styles}</style>
          <Player />
          <Navigation />
          <div className="main">{children}</div>
        </div>
      </ReduxProvider>
    );
  }
}

Page.propTypes = {
  children: PropTypes.any.isRequired,
  store: PropTypes.object.isRequired,
};

export default withRedux(makeStore)(Page);
