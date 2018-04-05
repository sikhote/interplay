import React from 'react';
import { AutoSizer, Column, SortDirection, Table } from 'react-virtualized';
import firstBy from 'thenby';
import PropTypes from 'prop-types';

const songsSorter = (data, sortBy, sortDirection) => {
  const options = { ignoreCase: true, direction: sortDirection ? 1 : -1 };

  switch (sortBy) {
    case 'track':
      return data.sort(
        firstBy(sortBy, options)
          .thenBy('artist', options)
          .thenBy('album', options),
      );
    case 'artist':
      return data.sort(
        firstBy(sortBy, options)
          .thenBy('album', options)
          .thenBy('track', options),
      );
    case 'album':
      return data.sort(
        firstBy(sortBy, options)
          .thenBy('artist', options)
          .thenBy('track', options),
      );
    default:
      return data.sort(firstBy(sortBy, options));
  }
};

const FileTable = ({ columns, data, settings, saveSettings }) => {
  const { position, sortBy, sortDirection } = settings;
  const sortedData = songsSorter(data, sortBy, sortDirection);

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <AutoSizer>
        {({ height, width }) => (
          <Table
            onRowClick={({ event, index, rowData }) => {
              // eslint-disable-next-line
              console.log(event, index, rowData);
            }}
            headerHeight={30}
            headerStyle={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
            height={height}
            noRowsRenderer={() => <div>No rows</div>}
            rowCount={sortedData.length}
            rowGetter={({ index }) => sortedData[index]}
            rowHeight={20}
            scrollToIndex={position}
            width={width}
            rowStyle={{
              display: 'grid',
              // prettier-ignore
              grid: `none / ${
                columns.reduce(
                  (a, v) => a + (v.width ? ` ${v.width}px` : ' 1fr'),
                  '',
                )}`
            }}
            sort={({ sortBy, sortDirection }) =>
              saveSettings({
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
                style={{
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
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
  saveSettings: PropTypes.func.isRequired,
};

export default FileTable;
