import React from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import Link from 'next/link';
import { connect } from 'react-redux';
import { get } from 'lodash';
import { colors } from '../../lib/styling';
import Icon from '../Icon';
import Text from '../Text';
import { titleToSlug } from '../../lib/playlists';
import { playlistsAdd } from '../../actions/playlists';
import styles from './styles';

const Navigation = ({ router, playlists, playlistsAdd }) => {
  const alpha = get(router.query, 'alpha');
  const path = `${router.pathname}${alpha ? `/${alpha}` : ''}`;
  const items = [
    { key: '/', title: 'Settings', icon: 'cog' },
    { key: '/audio', title: 'Audio', icon: 'audio' },
    { key: '/video', title: 'Video', icon: 'video' },
    {
      key: '/playlists',
      title: 'Playlists',
      icon: 'star',
      className: 'playlists',
    },
    ...playlists.map(({ name }) => ({
      key: `/playlists/${titleToSlug(name)}`,
      title: name,
      icon: 'star',
      className: 'playlist',
    })),
    {
      key: 'playlist-add',
      title: '',
      icon: 'list-add',
      className: 'playlist-add',
      onClick: () => {
        playlistsAdd().then(({ name }) =>
          Router.push(`/playlists/${titleToSlug(name)}`),
        );
      },
    },
  ];

  return (
    <div className="container">
      <style jsx>{styles}</style>
      {items.map(({ key, title, icon, className = '', onClick }) => {
        const inner = (
          <React.Fragment>
            <Icon icon={icon} color={colors.navigationItem} className="icon" />
            <Text color={colors.navigationItem} className="title">
              {title}
            </Text>
          </React.Fragment>
        );

        return onClick ? (
          <div key={key} className="item" onClick={onClick}>
            {inner}
          </div>
        ) : (
          <Link key={key} href={`${key}`}>
            <a className={`item ${className} ${path === key ? 'active' : ''}`}>
              {inner}
            </a>
          </Link>
        );
      })}
    </div>
  );
};

Navigation.propTypes = {
  router: PropTypes.object.isRequired,
  playlists: PropTypes.array.isRequired,
  playlistsAdd: PropTypes.func.isRequired,
};

export default connect(
  ({ playlists }) => ({
    playlists,
  }),
  dispatch => ({
    playlistsAdd: () => dispatch(playlistsAdd()),
  }),
)(Navigation);
