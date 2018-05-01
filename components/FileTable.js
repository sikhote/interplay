import React from 'react';
import { AutoSizer, Column, SortDirection, Table } from 'react-virtualized';
import PropTypes from 'prop-types';
import style from '../styles/file-table';
import getSortedData from '../lib/getSortedData';

const FileTable = ({
  columns,
  data,
  settings,
  settingsReplace,
  settingsReplaceAndCloudSaveOther,
  onRowClick,
}) => {
  const { position, sortBy, sortDirection } = settings;
  const sortedData = getSortedData(data, sortBy, sortDirection);

  return (
    <div className="root">
      <style jsx>{style}</style>
      Search goes here
      <AutoSizer>
        {({ height, width }) => (
          <Table
            onRowClick={({ rowData }) => onRowClick(rowData)}
            height={height}
            headerHeight={30}
            noRowsRenderer={() => <div>No rows</div>}
            rowCount={sortedData.length}
            rowGetter={({ index }) => sortedData[index]}
            rowHeight={20}
            scrollToIndex={position}
            width={width}
            rowStyle={{
              // prettier-ignore
              grid: `none / ${
                columns.reduce(
                  (a, v) => a + (v.width ? ` ${v.width}px` : ' 1fr'),
                  '',
                )}`
            }}
            sort={({ sortBy, sortDirection }) =>
              settingsReplaceAndCloudSaveOther({
                ...settings,
                sortBy,
                sortDirection: sortDirection === SortDirection.ASC,
              })
            }
            sortBy={sortBy}
            sortDirection={
              sortDirection ? SortDirection.ASC : SortDirection.DESC
            }
          >
            {columns.map(({ title, dataKey, width }) => (
              <Column
                key={title}
                label={title}
                dataKey={dataKey}
                width={width || 100}
              />
            ))}
          </Table>
        )}
      </AutoSizer>
    </div>
  );
};

FileTable.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  settings: PropTypes.object.isRequired,
  settingsReplace: PropTypes.func.isRequired,
  settingsReplaceAndCloudSaveOther: PropTypes.func.isRequired,
  onRowClick: PropTypes.func.isRequired,
};

export default FileTable;
