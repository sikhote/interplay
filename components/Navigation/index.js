import React, { useMemo } from 'react';
import { useWindowDimensions, View } from 'react-native';
import PropTypes from 'prop-types';
import { withRouter } from 'next/router';
import Link from '../Link';
import Icon from '../Icon';
import Text from '../Text';
import { titleToSlug } from '../../lib/playlists';
import getStyles from './get-styles';

const Navigation = ({ router, playlists, status, dispatch }) => {
  const { asPath } = router;
  const dimensions = useWindowDimensions();
  const styles = useMemo(() => getStyles(dimensions), [dimensions]);
  const items =
    status === 'connected'
      ? [
          { id: '/', title: 'Settings', icon: 'cog' },
          { id: '/audio', title: 'Audio', icon: 'audio' },
          { id: '/video', title: 'Video', icon: 'video' },
          { id: '/recent', title: 'Recent', icon: 'calendar' },
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
            style: styles.itemPlaylistAdd,
            onClick: () => dispatch({ type: 'playlists-add' }),
          },
        ]
      : [];

  return (
    <View style={styles.root}>
      <View style={styles.inner}>
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
            <View
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
            </View>
          ) : (
            <Link
              key={id}
              id={id}
              href={href || id}
              label={inner}
              style={Object.assign(
                {},
                styles.item,
                style,
                asPath === id ? styles.itemActive : {},
              )}
            />
          );
        })}
      </View>
    </View>
  );
};

Navigation.propTypes = {
  router: PropTypes.object.isRequired,
  playlists: PropTypes.array.isRequired,
  status: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default withRouter(Navigation);
