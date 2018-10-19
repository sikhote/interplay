import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'next/router';
import { connect } from 'react-redux';
import { get } from 'lodash';
import styles from './styles';
import { View, TouchableOpacity, Text } from '../rnw';
import { bps, fontSizes, colors } from '../../lib/styling';
import DimensionsContext from '../DimensionsContext';
import getMenuItems from '../../lib/getMenuItems';
import Icon from '../Icon';

const Navigation = ({ router, playlists }) => {
  const alpha = get(router.query, 'alpha');
  const path = `${router.pathname}${alpha ? `/${alpha}` : ''}`;

  return (
    <DimensionsContext.Consumer>
      {({ width }) => (
        <View
          style={[styles.container, width < bps.a3 ? styles.containerA3 : {}]}
        >
          {getMenuItems(width, playlists).map(({ key, title, icon }) => (
            <TouchableOpacity
              key={key}
              role="button"
              onPress={() => router.push(key)}
              style={[styles.item, width < bps.a3 ? styles.itemA3 : {}]}
            >
              <Icon
                icon={icon}
                fontSize={fontSizes.navigationItem}
                color={
                  key === path
                    ? colors.navigationItemActive
                    : colors.navigationItem
                }
              />
              {width >= bps.a3 && (
                <Text
                  style={styles.itemTitle}
                  fontSize={fontSizes.navigationItem}
                  color={
                    key === path
                      ? colors.navigationItemActive
                      : colors.navigationItem
                  }
                >
                  {title}
                </Text>
              )}
            </TouchableOpacity>
          ))}
        </View>
      )}
    </DimensionsContext.Consumer>
  );
};

Navigation.propTypes = {
  router: PropTypes.object.isRequired,
  playlists: PropTypes.array.isRequired,
};

export default withRouter(
  connect(
    ({ playlists }) => ({
      playlists,
    }),
    null,
  )(Navigation),
);
