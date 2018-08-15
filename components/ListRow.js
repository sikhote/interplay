import React from 'react';
import PropTypes from 'prop-types';
import { Draggable } from 'react-beautiful-dnd';
import style from '../styles/list-row';

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
  delete rowStyle.overflow;
  const innerStyle = { grid: style.grid };

  return (
    <Draggable draggableId={rowData.name} index={index}>
      {(provided, snapshot) => {
        let newClassName = className;

        if (snapshot.isDragging) {
          newClassName += ' is-dragging';
        }

        if (index % 2 === 0) {
          newClassName += ' even';
        }

        return (
          <div style={rowStyle}>
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              {...a11yProps}
              role="row"
              className="draggable"
            >
              <style jsx>{`
                .draggable {
                  top: 0 !important;
                  left: 0 !important;
                  position: relative !important;
                  z-index: 99999999;
                }
              `}</style>
              <div style={innerStyle} className={newClassName}>
                {columns}
              </div>
            </div>
          </div>
        );
      }}
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
