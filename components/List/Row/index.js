import React, { memo, useMemo } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, useWindowDimensions } from 'react-native';
import moment from 'moment';
import Button from 'components/Button';
import Text from 'components/Text';
import getStyles from './get-styles';

const Row = ({ style, index, data }) => {
  const dimensions = useWindowDimensions();
  const styles = useMemo(() => getStyles(dimensions), [dimensions]);
  const {
    sortedData = [],
    currentPath = '',
    columns,
    onRowClick,
    onOptionsClick,
    source,
  } = data;
  const rowData = sortedData[index] || {};

  return (
    <TouchableOpacity
      style={[
        style,
        styles.root,
        source === 'playlists' ? styles.rootPlaylists : {},
        source === 'video' ? styles.rootVideo : {},
        source === 'recent' ? styles.rootRecent : {},
        index % 2 ? styles.rootOdd : {},
        rowData.path === currentPath ? styles.rootActive : {},
      ]}
      onClick={() => onRowClick({ index, rowData })}
    >
      {columns.map(({ key }) => (
        <span key={key} style={styles.column}>
          {key === 'dateAdded'
            ? moment(rowData[key]).format('YYYY/MM/DD HH:mm:ss')
            : rowData[key]}
        </span>
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
};

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

const MemoRow = memo(Row);

export default MemoRow;
