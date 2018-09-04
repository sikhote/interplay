import React from 'react';
import PropTypes from 'prop-types';
import { Draggable } from 'react-beautiful-dnd';
import { get } from 'lodash';
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
  settings,
  source,
}) => {
  const currentPath = get(settings, 'player.file.path');
  const path = get(rowData, 'path');
  let isDraggable = false;
  let newClassName = className;

  switch (source) {
    case 'playlist':
      newClassName = `${className} ${path === currentPath ? 'active' : ''}`;
      isDraggable = true;
      break;
    case 'playlists':
      break;
    default:
      newClassName = `${className} ${path === currentPath ? 'active' : ''}`;
      break;
  }

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

  const inner = (
    <div
      className={`${newClassName}${index % 2 === 0 ? ' even' : ''}`}
      {...a11yProps}
    >
      {columns}
    </div>
  );

  return (
    <div className="root" style={style}>
      <style jsx>{css}</style>
      {isDraggable ? (
        <Draggable draggableId={rowData.name} index={index}>
          {(provided, { isDragging }) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              className={`draggable${isDragging ? ' is-dragging' : ''}`}
            >
              {inner}
            </div>
          )}
        </Draggable>
      ) : (
        inner
      )}
    </div>
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
  settings: PropTypes.object.isRequired,
  source: PropTypes.string.isRequired,
};

ListRow.defaultProps = {
  onRowClick: undefined,
  onRowDoubleClick: undefined,
  onRowMouseOver: undefined,
  onRowMouseOut: undefined,
  onRowRightClick: undefined,
};

export default ListRow;
