import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'next/router';
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
  const id = get(router.query, 'id');
  const path = `${router.pathname}${id ? `/${id}` : ''}`;
  const items = [
    { id: '/', title: 'Settings', icon: 'cog' },
    { id: '/audio', title: 'Audio', icon: 'audio' },
    { id: '/video', title: 'Video', icon: 'video' },
    { id: '/playlists', title: 'Playlists', icon: 'star' },
    ...playlists.map(({ name }) => ({
      href: `/playlists?id=${titleToSlug(name)}`,
      id: `/playlists/${titleToSlug(name)}`,
      title: name,
      icon: 'star',
      className: 'playlist',
    })),
    {
      id: 'playlist-add',
      title: 'Add',
      icon: 'list-add',
      className: 'playlist-add',
      onClick: () => playlistsAdd(),
    },
  ];

  return (
    <div className="container">
      <style jsx>{styles}</style>
      <div className="container-inner">
        {items.map(({ id, href, title, icon, className = '', onClick }) => {
          const inner = (
            <>
              <Icon
                icon={icon}
                color={colors.navigationItem}
                className="icon"
              />
              <Text color={colors.navigationItem} className="title">
                {title}
              </Text>
            </>
          );

          return onClick ? (
            <div key={id} className="item" onClick={onClick}>
              {inner}
            </div>
          ) : (
            <Link key={id} as={id} href={href || id}>
              <a className={`item ${className} ${path === id ? 'active' : ''}`}>
                {inner}
              </a>
            </Link>
          );
        })}
      </div>
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
      playlists,
    }),
    dispatch => ({
      playlistsAdd: () => dispatch(playlistsAdd()),
    }),
  )(Navigation),
);
