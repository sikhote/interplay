import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useWindowDimensions, TouchableOpacity, View } from 'react-native';
import moment from 'moment';
import { merge } from 'lodash';
import Text from '../../Text';
import Icon from '../../Icon';
import getStyles from './get-styles';

const Row = ({
  style,
  index,
  rowData,
  source,
  selections,
  currentPath,
  columns,
  onPress,
  onClickColumn,
  isHeader,
  sortBy,
}) => {
  const dimensions = useWindowDimensions();
  const styles = useMemo(() => getStyles(dimensions), [dimensions]);
  const isSelected = useMemo(
    () =>
      source === 'playlists'
        ? selections.includes(rowData.name)
        : ['video', 'audio'].includes(source)
        ? selections.includes(rowData.path)
        : selections.includes(index),
    [source, selections, rowData, index],
  );
  const Container = useMemo(() => (onPress ? TouchableOpacity : View), [
    onPress,
  ]);

  return (
    <Container
      style={merge(
        {},
        style,
        styles.root,
        index % 2 ? styles.rootOdd : {},
        isHeader ? styles.rootHeader : {},
        source === 'playlists' ? styles.rootPlaylists : {},
        source === 'video' ? styles.rootVideo : {},
        source === 'recent' ? styles.rootRecent : {},
        isSelected ? styles.rootSelected : {},
        rowData.path === currentPath ? styles.rootActive : {},
      )}
      onPress={() => onPress({ index, rowData })}
    >
      {columns.map(({ key, title }) => (
        <Text
          key={key}
          style={merge({}, styles.column, isHeader ? styles.columnHeader : {})}
          {...(isHeader
            ? {
                color: sortBy === key ? 'text' : 'textFaded',
                fontWeight: 'bold',
                fontSize: 'b',
                onClick: () => onClickColumn(key),
              }
            : {})}
        >
          {isHeader
            ? title
            : key === 'dateAdded'
            ? moment(rowData[key]).format('YYYY/MM/DD HH:mm:ss')
            : rowData[key]}
          {isHeader && sortBy === key && (
            <Text color="text" fontSize="a">
              <Icon fontSize="a" icon="sort" />
            </Text>
          )}
        </Text>
      ))}
    </Container>
  );
};

Row.propTypes = {
  columns: PropTypes.array.isRequired,
  index: PropTypes.number,
  onPress: PropTypes.func,
  onClickColumn: PropTypes.func,
  rowData: PropTypes.any,
  style: PropTypes.any,
  currentPath: PropTypes.string,
  selections: PropTypes.array,
  source: PropTypes.string.isRequired,
  isHeader: PropTypes.bool,
  sortBy: PropTypes.string,
};

Row.defaultProps = {
  currentPath: '',
  style: {},
  isHeader: false,
  selections: [],
  rowData: {},
  onPress: undefined,
  onClickColumn: undefined,
  index: null,
  sortBy: undefined,
};

export default Row;
