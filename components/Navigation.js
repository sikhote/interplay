import React from 'react';
import { Menu, Icon } from 'antd';
import PropTypes from 'prop-types';
import { withRouter } from 'next/router';
import { connect } from 'react-redux';
import WindowSizeListener from 'react-window-size-listener';
import { get } from 'lodash';
import { bps } from '../styles/base';
import style from '../styles/navigation';
import { playlistsAdd } from '../actions/playlists';
import { titleToSlug } from '../lib/playlists';

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: typeof window !== 'undefined' ? window.innerWidth : bps.medium,
    };
  }
  render() {
    const {
      router,
      playlists: { playlists },
    } = this.props;
    const { width } = this.state;
    const alpha = get(router.query, 'alpha');

    return (
      <div className="root">
        <style jsx>{style}</style>
        <WindowSizeListener
          onResize={({ windowWidth: width }) => this.setState({ width })}
        />
        <Menu
          onClick={({ key }) => router.push(key)}
          selectedKeys={[`${router.pathname}${alpha ? `/${alpha}` : ''}`]}
          mode={width < 800 ? 'horizontal' : 'inline'}
          theme="dark"
        >
          {[
            { key: '/', icon: 'setting', message: 'Settings' },
            { key: '/audio', icon: 'sound', message: 'Audio' },
            { key: '/video', icon: 'video-camera', message: 'Video' },
          ].map(({ key, icon, message }) => (
            <Menu.Item key={key}>
              <Icon type={icon} /> <span>{message}</span>
            </Menu.Item>
          ))}
          {width < 800 && (
            <Menu.Item key="/playlists">
              <Icon type="bars" /> <span>Playlists</span>
            </Menu.Item>
          )}
          {width > 800 &&
            playlists.map(({ name }) => (
              <Menu.Item key={`/playlists/${titleToSlug(name)}`}>
                <Icon type="bars" /> <span>{name}</span>
              </Menu.Item>
            ))}
        </Menu>
      </div>
    );
  }
}

Navigation.propTypes = {
  router: PropTypes.object.isRequired,
  playlists: PropTypes.object.isRequired,
};

export default withRouter(
  connect(
    ({ playlists }) => ({ playlists }),
    dispatch => ({
      playlistsAdd: payload => dispatch(playlistsAdd(payload)),
    }),
  )(Navigation),
);
