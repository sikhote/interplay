import React from 'react';
import PropTypes from 'prop-types';
import { Draggable } from 'react-beautiful-dnd';
import css from '../styles/list-row';

const ListRow = ({
  className,
  columns,
  index,
  onRowClick,
  onRowDoubleClick,
  onRowMouseOut,
  onRowMouseOver,
  onRowRightClick,
  rowData,
  style,
}) => {
  const a11yProps = {};

  if (
    onRowClick ||
    onRowDoubleClick ||
    onRowMouseOut ||
    onRowMouseOver ||
    onRowRightClick
  ) {
    a11yProps['aria-label'] = 'row';
    a11yProps.tabIndex = 0;

    if (onRowClick) {
      a11yProps.onClick = event => onRowClick({ event, index, rowData });
    }
    if (onRowDoubleClick) {
      a11yProps.onDoubleClick = event =>
        onRowDoubleClick({ event, index, rowData });
    }
    if (onRowMouseOut) {
      a11yProps.onMouseOut = event => onRowMouseOut({ event, index, rowData });
    }
    if (onRowMouseOver) {
      a11yProps.onMouseOver = event =>
        onRowMouseOver({ event, index, rowData });
    }
    if (onRowRightClick) {
      a11yProps.onContextMenu = event =>
        onRowRightClick({ event, index, rowData });
    }
  }
  const rowStyle = { ...style };
  delete rowStyle.grid;
  const innerStyle = { grid: style.grid };

  return (
    <Draggable draggableId={rowData.name} index={index}>
      {(provided, { isDragging }) => (
        <div style={rowStyle}>
          <style jsx>{css}</style>
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            {...a11yProps}
            role="row"
            className={`draggable${isDragging ? ' is-dragging' : ''}`}
          >
            <div
              style={innerStyle}
              className={`${className}${index % 2 === 0 ? ' even' : ''}`}
            >
              {columns}
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

ListRow.propTypes = {
  className: PropTypes.string.isRequired,
  columns: PropTypes.array.isRequired,
  index: PropTypes.number.isRequired,
  isScrolling: PropTypes.bool.isRequired,
  onRowClick: PropTypes.func,
  onRowDoubleClick: PropTypes.func,
  onRowMouseOver: PropTypes.func,
  onRowMouseOut: PropTypes.func,
  onRowRightClick: PropTypes.func,
  rowData: PropTypes.any.isRequired,
  style: PropTypes.any.isRequired,
};

ListRow.defaultProps = {
  onRowClick: undefined,
  onRowDoubleClick: undefined,
  onRowMouseOver: undefined,
  onRowMouseOut: undefined,
  onRowRightClick: undefined,
};

export default ListRow;
