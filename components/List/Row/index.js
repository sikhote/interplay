import React, { memo, useMemo } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, useWindowDimensions, View } from 'react-native';
import moment from 'moment';
import Button from 'components/Button';
import Text from 'components/Text';
import getStyles from './get-styles';
import { getColumnWidths } from 'lib/columns';

const Row = memo(({ style, index, data }) => {
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
  const columnWidths = useMemo(() => getColumnWidths(source), [source]);

  return (
    <View
      style={[
        style,
        styles.root,
        index % 2 ? styles.rootOdd : {},
        rowData.path === currentPath ? styles.rootActive : {},
      ]}
    >
      <TouchableOpacity
        style={[
          styles.inner,
          source === 'playlists' ? styles.innerPlaylists : {},
          source === 'video' ? styles.innerVideo : {},
          source === 'recent' ? styles.innerRecent : {},
        ]}
        onClick={() => onRowClick({ index, rowData })}
      >
        {columns.map(({ key }, index) => (
          <React.Fragment key={key}>
            <Text
              style={[
                styles.column,
                {
                  width: columnWidths.desktop[index],
                },
              ]}
            >
              {key === 'dateAdded'
                ? moment(rowData[key]).format('YYYY/MM/DD HH:mm:ss')
                : rowData[key]}
            </Text>
            <View style={styles.columnGap} />
          </React.Fragment>
        ))}
      </TouchableOpacity>
      <Button
        isEnclosed={false}
        theme="subtle"
        size="small"
        shape="circle"
        icon="options"
        onPress={() => onOptionsClick({ rowData, index })}
      />
    </View>
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
