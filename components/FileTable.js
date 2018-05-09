import React from 'react';
import {
  AutoSizer,
  Column,
  SortDirection,
  Table,
  defaultTableRowRenderer,
} from 'react-virtualized';
import { Input, Icon } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import style from '../styles/file-table';
import getSortedData from '../lib/getSortedData';
import { cloudSaveOther } from '../actions/cloud';
import { settingsReplace } from '../actions/settings';
import { filesGetUrlAndPlay } from '../actions/files';
import fileColumns from '../lib/fileColumns';
import fileSearchKeys from '../lib/fileSearchKeys';

class FileTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
    };
  }
  render() {
    const {
      source,
      files,
      settings,
      settingsReplaceAndCloudSaveOther,
      filesGetUrlAndPlay,
    } = this.props;
    const { position, sortBy, sortDirection } = settings[source];
    const { search } = this.state;
    const searchedData = search
      ? files[source].filter(file =>
          fileSearchKeys[source].find(
            key => file[key].toLowerCase().indexOf(search.toLowerCase()) !== -1,
          ),
        )
      : files[source];
    const sortedData = getSortedData(searchedData, sortBy, sortDirection);
    const { player: { file: { path: currentPath } } } = settings;

    return (
      <div className="root">
        <style jsx>{style}</style>
        <div className="search">
          <Input
            size="small"
            addonBefore={<Icon type="search" />}
            placeholder="Search"
            value={search}
            onChange={e => this.setState({ search: e.target.value })}
          />
        </div>
        <div>
          <AutoSizer>
            {({ height, width }) => (
              <Table
                onRowClick={({ rowData: { path } }) =>
                  filesGetUrlAndPlay({ source: 'audio', path })
                }
                height={height}
                headerHeight={30}
                noRowsRenderer={() => <div>No rows</div>}
                rowRenderer={arg => {
                  const { rowData: { path }, className } = arg;
                  const newClassName = `${className} ${
                    path === currentPath ? 'active' : ''
                  }`;
                  return defaultTableRowRenderer({
                    ...arg,
                    className: newClassName,
                  });
                }}
                rowCount={sortedData.length}
                rowGetter={({ index }) => sortedData[index]}
                rowHeight={26}
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
      </div>
    );
  }
}

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
