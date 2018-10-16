import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { transparentize } from 'polished';
import { colors, spacing } from '../styles/base';

const ListRow = ({
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
}) => {
  const currentPath = get(settings, 'player.file.path');
  const path = get(rowData, 'path');
  const newStyle = {
    ...style,
    outline: 'none',
    alignItems: 'center',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    paddingLeft: spacing.size3,
    paddingRight: spacing.size3,
  };
  // const innerStyle = {
  //   display: style.display,
  //   grid: style.grid,
  //   outline: 'none',
  // }
  // delete containerStyle.display;
  // delete containerStyle.grid;

  if (path === currentPath) {
    newStyle.backgroundColor = transparentize(0.8, colors.blue);
  } else if (index % 2 === 0) {
    newStyle.backgroundColor = 'rgba(0, 0, 0, 0.03)';
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

  return (
    // <div style={containerStyle}>
    <div style={newStyle} {...a11yProps}>
      {columns}
    </div>
    // </div>
  );
};

ListRow.propTypes = {
  columns: PropTypes.array.isRequired,
  index: PropTypes.number.isRequired,
  onRowClick: PropTypes.func,
  onRowDoubleClick: PropTypes.func,
  onRowMouseOver: PropTypes.func,
  onRowMouseOut: PropTypes.func,
  onRowRightClick: PropTypes.func,
  rowData: PropTypes.any.isRequired,
  style: PropTypes.any.isRequired,
  settings: PropTypes.object.isRequired,
};

ListRow.defaultProps = {
  onRowClick: undefined,
  onRowDoubleClick: undefined,
  onRowMouseOver: undefined,
  onRowMouseOut: undefined,
  onRowRightClick: undefined,
};

export default ListRow;
