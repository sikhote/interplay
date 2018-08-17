import React from 'react';
import { Menu, Icon } from 'antd';
import PropTypes from 'prop-types';
import { withRouter } from 'next/router';
import { connect } from 'react-redux';
import { get } from 'lodash';
import { bps } from '../styles/base';
import style from '../styles/navigation';
import { playlistsAdd } from '../actions/playlists';
import { titleToSlug } from '../lib/playlists';

const Navigation = ({ router, playlists, isDragging }) => {
  const alpha = get(router.query, 'alpha');

  return (
    <div className="root">
      <style jsx>{style}</style>
      {[
        { key: '/', title: 'Settings', icon: 'cog' },
        { key: '/audio', title: 'Files', icon: 'list' },
        { key: '/playlists', title: 'Playlists', icon: 'star' },
        ].map(({ key, title, icon }) => (
          <div key={key} onClick={() => router.push(key)}>
            {title} <i className={`icon-${icon}`}>&#xe800;</i>
          </div>
      ))}
      <Menu
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
            <div
              key={`/playlists/${titleToSlug(name)}`}
              className={
                isDragging || true ? 'item-container is-droppable' : ''
              }
            >
              <Menu.Item key={`/playlists/${titleToSlug(name)}Item`}>
                <Icon type="bars" /> <span>{name}</span>
              </Menu.Item>
            </div>
          ))}
      </Menu>
    </div>
  );
};

Navigation.propTypes = {
  router: PropTypes.object.isRequired,
  playlists: PropTypes.array.isRequired,
  isDragging: PropTypes.bool.isRequired,
};

export default withRouter(
  connect(
    ({ playlists, dragging }) => ({
      playlists: playlists.playlists,
      isDragging: dragging.isDragging,
    }),
    dispatch => ({
      playlistsAdd: payload => dispatch(playlistsAdd(payload)),
    }),
  )(Navigation),
);
