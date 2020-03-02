import React from 'react';
import PropTypes from 'prop-types';
import { useWindowDimensions } from 'react-native';
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
  onClick,
  onDoubleClick,
  onClickColumn,
  isHeader,
  sortBy,
}) => {
  const dimensions = useWindowDimensions();
  const styles = getStyles(dimensions);
  const isSelected =
    source === 'playlists'
      ? selections.includes(rowData.name)
      : ['video', 'audio'].includes(source)
      ? selections.includes(rowData.path)
      : selections.includes(index);

  return (
    <div
      style={merge(
        {},
        style,
        styles.root,
        index % 2 ? styles.rootOdd : {},
        isHeader ? styles.rootHeader : {},
        source === 'playlists' ? styles.rootPlaylists : {},
        source === 'video' ? styles.rootVideo : {},
        isSelected ? styles.rootSelected : {},
        rowData.path === currentPath ? styles.rootActive : {},
      )}
      onClick={() => setTimeout(() => onClick({ index, rowData }), 10)}
      onDoubleClick={() => onDoubleClick({ index, rowData })}
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
          {isHeader ? title : rowData[key]}
          {isHeader && sortBy === key && (
            <Text color="text" fontSize="a">
              <Icon fontSize="a" icon="sort" />
            </Text>
          )}
        </Text>
      ))}
    </div>
  );
};

Row.propTypes = {
  columns: PropTypes.array.isRequired,
  index: PropTypes.number,
  onClick: PropTypes.func,
  onDoubleClick: PropTypes.func,
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
  onClick: () => null,
  onDoubleClick: () => null,
  onClickColumn: () => null,
  index: null,
  sortBy: undefined,
};

export default Row;
