import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import moment from 'moment';
import Button from '../../Button';
import Text from '../../Text';

const Row = memo(({ style, index, data }) => {
  const {
    sortedData = [],
    currentPath = '',
    columns,
    onRowClick,
    onOptionsClick,
    styles,
    source,
  } = data;
  const rowData = sortedData[index] || {};

  return (
    <TouchableOpacity
      style={Object.assign(
        {},
        style,
        styles.root,
        source === 'playlists' ? styles.rootPlaylists : {},
        source === 'video' ? styles.rootVideo : {},
        source === 'recent' ? styles.rootRecent : {},
        index % 2 ? styles.rootOdd : {},
        rowData.path === currentPath ? styles.rootActive : {},
      )}
      onClick={() => onRowClick({ index, rowData })}
    >
      {columns.map(({ key }) => (
        <Text key={key} style={styles.column}>
          {key === 'dateAdded'
            ? moment(rowData[key]).format('YYYY/MM/DD HH:mm:ss')
            : rowData[key]}
        </Text>
      ))}
      <Button
        isEnclosed={false}
        theme="subtle"
        size="small"
        shape="circle"
        icon="options"
        onPress={() => onOptionsClick({ rowData, index })}
      />
    </TouchableOpacity>
  );
});

Row.propTypes = {
  index: PropTypes.number,
  style: PropTypes.any,
  data: PropTypes.object,
};

Row.defaultProps = {
  index: null,
  style: {},
  data: {},
};

export default Row;
