import React from 'react';
import { AutoSizer, Column, SortDirection, Table } from 'react-virtualized';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import style from '../styles/file-table';
import getSortedData from '../lib/getSortedData';
import { cloudSaveOther } from '../actions/cloud';
import { settingsReplace } from '../actions/settings';
import { filesGetUrlAndPlay } from '../actions/files';
import fileColumns from '../lib/fileColumns';

const FileTable = ({
  source,
  files,
  settings,
  settingsReplaceAndCloudSaveOther,
  filesGetUrlAndPlay,
}) => {
  const { position, sortBy, sortDirection } = settings[source];
  const sortedData = getSortedData(files[source], sortBy, sortDirection);

  return (
    <div className="root">
      <style jsx>{style}</style>
      Search goes here
      <AutoSizer>
        {({ height, width }) => (
          <Table
            onRowClick={({ rowData: { path } }) =>
              filesGetUrlAndPlay({ source: 'audio', path })
            }
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
                fileColumns[source].reduce(
                  (a, v) => a + (v.width ? ` ${v.width}px` : ' 1fr'),
                  '',
                )}`
            }}
            sort={({ sortBy, sortDirection }) =>
              settingsReplaceAndCloudSaveOther({
                ...settings,
                [source]: {
                  ...settings[source],
                  sortBy,
                  sortDirection: sortDirection === SortDirection.ASC,
                },
              })
            }
            sortBy={sortBy}
            sortDirection={
              sortDirection ? SortDirection.ASC : SortDirection.DESC
            }
          >
            {fileColumns[source].map(({ title, dataKey, width }) => (
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
  source: PropTypes.string.isRequired,
  files: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
  settingsReplaceAndCloudSaveOther: PropTypes.func.isRequired,
  filesGetUrlAndPlay: PropTypes.func.isRequired,
};

export default connect(
  ({ files, settings }) => ({ files, settings }),
  dispatch => ({
    settingsReplaceAndCloudSaveOther: payload => {
      dispatch(settingsReplace(payload));
      dispatch(cloudSaveOther());
    },
    filesGetUrlAndPlay: payload => dispatch(filesGetUrlAndPlay(payload)),
  }),
)(FileTable);
