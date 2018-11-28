import React from 'react';
import PropTypes from 'prop-types';

const ListRow = ({
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
}) => {
  const isSelected =
    source === 'playlists'
      ? selections.includes(rowData.name)
      : selections.includes(rowData.path);
  className += isSelected ? ' selected' : '';
  className += rowData.path === currentPath ? ' active' : '';

  return (
    <div
      className={className}
      style={style}
      aria-label="row"
      tabIndex={0}
      onClick={event => onRowClick({ event, index, rowData })}
      onDoubleClick={event => onRowDoubleClick({ event, index, rowData })}
    >
      {columns}
    </div>
  );
};

ListRow.propTypes = {
  className: PropTypes.any.isRequired,
  columns: PropTypes.array.isRequired,
  index: PropTypes.number.isRequired,
  onRowClick: PropTypes.func.isRequired,
  onRowDoubleClick: PropTypes.func.isRequired,
  rowData: PropTypes.any.isRequired,
  style: PropTypes.any.isRequired,
  currentPath: PropTypes.string,
  selections: PropTypes.array.isRequired,
  source: PropTypes.string.isRequired,
};

ListRow.defaultProps = {
  currentPath: '',
};

export default ListRow;
