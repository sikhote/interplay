import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';

const ListRow = ({
	className,
	columns,
	currentPath,
	index,
	onRowDoubleClick,
	rowData,
	style,
}) => {
	const path = get(rowData, 'path');
	return (
		<div
			className={`${className} ${path === currentPath ? 'active' : ''}`}
			style={style}
			aria-label="row"
			tabIndex={0}
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
	onRowDoubleClick: PropTypes.func.isRequired,
	rowData: PropTypes.any.isRequired,
	style: PropTypes.any.isRequired,
	currentPath: PropTypes.string.isRequired,
};

export default ListRow;
