import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'next/router';
import Link from 'next/link';
import { get, merge } from 'lodash';
import Icon from '../Icon';
import Text from '../Text';
import { titleToSlug } from '../../lib/playlists';
import styles from './styles';

const Navigation = ({ router, playlists, dispatch }) => {
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
      css: styles.itemPlaylist,
    })),
    {
      id: 'playlist-add',
      title: 'Add',
      icon: 'list-add',
      css: styles.itemPlaylist,
      onClick: () => dispatch({ type: 'playlists-add' }),
    },
  ];

  return (
    <div css={styles.root}>
      <div css={styles.inner}>
        {items.map(({ id, href, title, icon, css = {}, onClick }) => {
          const inner = (
            <Text
              css={merge(
                {},
                styles.itemText,
                path === id ? styles.itemTextActive : {},
              )}
            >
              <Icon css={styles.itemTextIcon} icon={icon} />
              <span css={styles.itemTextContent}>{title}</span>
            </Text>
          );

          return onClick ? (
            <div
              key={id}
              css={merge(
                {},
                styles.item,
                css,
                path === id ? styles.itemActive : {},
              )}
              onClick={onClick}
            >
              {inner}
            </div>
          ) : (
            <Link key={id} as={id} href={href || id}>
              <a
                css={merge(
                  {},
                  styles.item,
                  css,
                  path === id ? styles.itemActive : {},
                )}
              >
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
  dispatch: PropTypes.func.isRequired,
};

export default withRouter(Navigation);
