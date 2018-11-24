import React from 'react';
import PropTypes from 'prop-types';

const ListRow = ({
  className,
  columns,
  currentPath,
  index,
  onRowClick,
  rowData,
  style,
}) => (
  <div
    className={`${className} ${rowData.path === currentPath ? 'active' : ''}`}
    style={style}
    aria-label="row"
    tabIndex={0}
    onClick={event => onRowClick({ event, index, rowData })}
  >
    {columns}
  </div>
);

ListRow.propTypes = {
  className: PropTypes.any.isRequired,
  columns: PropTypes.array.isRequired,
  index: PropTypes.number.isRequired,
  onRowClick: PropTypes.func.isRequired,
  rowData: PropTypes.any.isRequired,
  style: PropTypes.any.isRequired,
  currentPath: PropTypes.string.isRequired,
};

export default ListRow;
