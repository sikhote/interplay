import React from 'react';
import { useWindowDimensions } from 'react-native';
import PropTypes from 'prop-types';
import { withRouter } from 'next/router';
import Link from 'next/link';
import Icon from '../Icon';
import Text from '../Text';
import { titleToSlug } from '../../lib/playlists';
import getStyles from './get-styles';

const Navigation = ({ router, store, dispatch }) => {
  const {
    playlists,
    cloud: { status },
  } = store;
  const { asPath } = router;
  const dimensions = useWindowDimensions();
  const styles = getStyles(dimensions);
  const items =
    status === 'connected'
      ? [
          { id: '/', title: 'Settings', icon: 'cog' },
          { id: '/audio', title: 'Audio', icon: 'audio' },
          { id: '/video', title: 'Video', icon: 'video' },
          { id: '/playlists', title: 'Playlists', icon: 'star' },
          ...playlists.map(({ name }) => ({
            href: '/playlists/[id]',
            id: `/playlists/${titleToSlug(name)}`,
            title: name,
            icon: 'star',
            style: styles.itemPlaylist,
          })),
          {
            id: 'playlist-add',
            title: 'Add',
            icon: 'list-add',
            style: styles.itemPlaylist,
            onClick: () => dispatch({ type: 'playlists-add' }),
          },
        ]
      : [];

  return (
    <div style={styles.root}>
      <div style={styles.inner}>
        {items.map(({ id, href, title, icon, style = {}, onClick }) => {
          const inner = (
            <Text
              style={Object.assign(
                {},
                styles.itemText,
                asPath === id ? styles.itemTextActive : {},
              )}
            >
              <Icon style={styles.itemTextIcon} icon={icon} />
              <span style={styles.itemTextContent}>{title}</span>
            </Text>
          );

          return onClick ? (
            <div
              key={id}
              style={Object.assign(
                {},
                styles.item,
                style,
                asPath === id ? styles.itemActive : {},
              )}
              onClick={onClick}
            >
              {inner}
            </div>
          ) : (
            <Link key={id} as={id} href={href || id}>
              <a
                style={Object.assign(
                  {},
                  styles.item,
                  style,
                  asPath === id ? styles.itemActive : {},
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
  store: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default withRouter(Navigation);
