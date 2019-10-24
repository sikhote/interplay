import React from 'react';
import PropTypes from 'prop-types';
import { merge } from 'lodash';
import Text from '../../Text';
import styles from './styles';

const Row = ({
  className,
  columns,
  currentPath,
  selections,
  source,
  index,
  onRowClick,
  onRowDoubleClick,
  rowData,
  style,
  isHeader,
}) => {
  const isSelected =
    source === 'playlists'
      ? selections.includes(rowData.name)
      : ['video', 'audio'].includes(source)
      ? selections.includes(rowData.path)
      : selections.includes(index);

  return (
    <div
      className={className}
      css={merge(
        {},
        style,
        styles.root,
        isHeader ? styles.rootHeader : {},
        source === 'playlists' ? styles.rootPlaylists : {},
        source === 'video' ? styles.rootVideo : {},
        isSelected ? styles.rootSelected : {},
        rowData.path === currentPath ? styles.rootActive : {},
      )}
      role="row"
      tabIndex={0}
      {...(isHeader
        ? {}
        : {
            onClick: event => onRowClick({ event, index, rowData }),
            onDoubleClick: event => onRowDoubleClick({ event, index, rowData }),
          })}
    >
      {columns.map(({ props, key }) => (
        <Text
          key={key}
          css={merge({}, styles.column, isHeader ? styles.columnHeader : {})}
          {...(isHeader
            ? {
                color: 'textFaded',
                fontWeight: 'bold',
                fontSize: 'b',
              }
            : {})}
          {...props}
        />
      ))}
    </div>
  );
};

Row.propTypes = {
  className: PropTypes.any.isRequired,
  columns: PropTypes.array.isRequired,
  index: PropTypes.number,
  onRowClick: PropTypes.func,
  onRowDoubleClick: PropTypes.func,
  rowData: PropTypes.any,
  style: PropTypes.any.isRequired,
  currentPath: PropTypes.string,
  selections: PropTypes.array,
  source: PropTypes.string.isRequired,
  isHeader: PropTypes.bool,
};

Row.defaultProps = {
  currentPath: '',
  isHeader: false,
  selections: [],
  rowData: {},
  onRowClick: () => null,
  onRowDoubleClick: () => null,
  index: null,
};

export default Row;
