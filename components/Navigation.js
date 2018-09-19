import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'next/router';
import { connect } from 'react-redux';
import { get } from 'lodash';
import css from '../styles/navigation';
import { playlistsAdd } from '../actions/playlists';
import { titleToSlug } from '../lib/playlists';

const Navigation = ({ router, playlists }) => {
  const alpha = get(router.query, 'alpha');
  const path = `${router.pathname}${alpha ? `/${alpha}` : ''}`;

  return (
    <div className="root">
      <style jsx>{css}</style>
      {[
        { key: '/', title: 'Settings', icon: 'cog' },
        { key: '/audio', title: 'Audio', icon: 'audio' },
        { key: '/video', title: 'Video', icon: 'video' },
        {
          key: '/playlists',
          title: 'Playlists',
          icon: 'star',
          className: ' playlists',
        },
        ...playlists.map(({ name }) => ({
          key: `/playlists/${titleToSlug(name)}`,
          title: name,
          icon: 'star',
          className: 'playlist',
        })),
        {
          key: 'playlists-add',
          title: '',
          icon: ' list-add',
          className: 'playlist-add',
        },
      ].map(({ key, title, icon, className = '' }, index) => (
        <div
          key={key}
          role="button"
          tabIndex={index}
          onClick={() => router.push(key)}
          className={`${className} item${key === path ? ' active' : ''}`}
        >
          <i className={`icon-${icon}`} />
          {title}
        </div>
      ))}
    </div>
  );
};

Navigation.propTypes = {
  router: PropTypes.object.isRequired,
  playlists: PropTypes.array.isRequired,
  playlistsAdd: PropTypes.func.isRequired,
};

export default withRouter(
  connect(
    ({ playlists }) => ({
      playlists: [],
    }),
    dispatch => ({
      playlistsAdd: payload => dispatch(playlistsAdd(payload)),
    }),
  )(Navigation),
);
