import React, { useMemo } from 'react';
import { useWindowDimensions, View } from 'react-native';
import PropTypes from 'prop-types';
import Text from '../../Text';
import Icon from '../../Icon';
import getStyles from './get-styles';
import { colors } from '../../../lib/styling';

const HeaderRow = ({ source, columns, onClickColumn, sortBy }) => {
  const dimensions = useWindowDimensions();
  const styles = useMemo(() => getStyles(dimensions), [dimensions]);

  return (
    <View
      style={[
        styles.root,
        source === 'playlists' ? styles.rootPlaylists : {},
        source === 'video' ? styles.rootVideo : {},
        source === 'recent' ? styles.rootRecent : {},
      ]}
    >
      {columns.map(({ key, title }) => (
        <Text
          key={key}
          style={[
            styles.column,
            { color: sortBy === key ? colors.text : colors.textFaded },
          ]}
          onClick={() => onClickColumn(key)}
        >
          {title}
          {sortBy === key && <Icon style={styles.icon} icon="sort" />}
        </Text>
      ))}
      <div />
    </View>
  );
};

HeaderRow.propTypes = {
  source: PropTypes.string.isRequired,
  columns: PropTypes.array.isRequired,
  onClickColumn: PropTypes.func.isRequired,
  sortBy: PropTypes.string.isRequired,
};

export default HeaderRow;
